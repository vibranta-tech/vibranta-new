from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from django.contrib.auth.decorators import login_required
from rest_framework import status
import razorpay
import json

from .models import Payment, Member
from apps.events.models import Event

# Initialize Razorpay client
razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))

def test_payment(request):
    """Render the payment test page."""
    if request.method == 'GET':
        return render(request, 'apps/payments/payment.html')

@login_required(login_url='login')
def create_payment(request):
    """Create a new Razorpay payment order."""
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    try:
        data = json.loads(request.body)
        event_id = data.get('event_id')
        # members_details = data.get('members_data')
        event = Event.objects.get(id=event_id)
        amount =  int(event.price) * 100  # Convert amount to paise
        # Create Razorpay order
        order = razorpay_client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })
        
        # Save payment details
        payment = Payment.objects.create(
            event_id=event_id,
            user=request.user,
            payment_id=order['id'],
            amount=amount / 100,  # Store in rupees
            status="created"
        )
        
        return JsonResponse({
            "payment_id": payment.id,
            "order_id": order['id'],
            "razorpay_api_key": settings.RAZORPAY_API_KEY
        }, status=status.HTTP_201_CREATED)
    
    except Event.DoesNotExist:
        return JsonResponse({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@login_required
def payment_verification(request):
    """Verify the Razorpay payment and update the event status."""
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    try:
        data = json.loads(request.body)
        members_details = data.get('members_data', [])
        payment_id = data.get('payment_id')
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_signature = data.get('razorpay_signature')
        
        # Verify Razorpay signature
        razorpay_client.utility.verify_payment_signature({
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature,
        })
        
        # Update payment status
        payment = Payment.objects.get(payment_id=razorpay_order_id)
        payment.status = 'success'
        payment.members = len(members_details)
        payment.save()
        
        # Save member details
        Member.objects.bulk_create([
            Member(
                payment_id=payment_id,
                name=member['name'],
                email=member['email'],
                phone=member['phone'],
                reg_no=member['reg_no'],
                section=member['section']
            ) for member in members_details
        ])
        
        return JsonResponse({
            "status": "success",
            "message": "Payment verified and event status updated."
        }, status=status.HTTP_200_OK)
    
    except razorpay.errors.SignatureVerificationError:
        return JsonResponse({"status": "failed", "message": "Payment verification failed."}, status=status.HTTP_400_BAD_REQUEST)
    except Payment.DoesNotExist:
        return JsonResponse({"status": "failed", "message": "Payment not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return JsonResponse({"status": "failed", "message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
