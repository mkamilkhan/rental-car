/**
 * Quick Payment Testing Script
 * Run this to test payment endpoints directly
 */

const axios = require('axios');

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Test data
const testBooking = {
  amount: 100,
  carId: 'YOUR_CAR_ID_HERE', // Replace with actual car ID
  carName: 'Test Car',
  customerName: 'Test User',
  customerEmail: 'test@example.com',
  contactNumber: '+971501234567',
  startDate: new Date().toISOString().split('T')[0],
  endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
  totalDays: 1,
  pickupLocation: 'normal',
  currency: 'AED'
};

async function testCashPayment() {
  console.log('\n🧪 Testing Cash Payment...\n');
  
  try {
    const response = await axios.post(`${API_URL}/api/bookings`, {
      ...testBooking,
      paymentMethod: 'cash'
    });
    
    console.log('✅ Cash Payment Test PASSED');
    console.log('Booking ID:', response.data._id);
    console.log('Status:', response.data.status);
    console.log('Payment Method:', response.data.paymentMethod);
  } catch (error) {
    console.error('❌ Cash Payment Test FAILED');
    console.error('Error:', error.response?.data || error.message);
  }
}

async function testStripeCheckout() {
  console.log('\n🧪 Testing Stripe Checkout Session...\n');
  
  try {
    const response = await axios.post(
      `${API_URL}/api/payment/create-checkout-session`,
      testBooking
    );
    
    console.log('✅ Stripe Checkout Test PASSED');
    console.log('Checkout URL:', response.data.url);
    console.log('Session ID:', response.data.sessionId);
    console.log('\n📝 Next Steps:');
    console.log('1. Open the checkout URL in browser');
    console.log('2. Use test card: 4242 4242 4242 4242');
    console.log('3. Complete payment');
    console.log('4. Verify booking is created');
  } catch (error) {
    console.error('❌ Stripe Checkout Test FAILED');
    console.error('Error:', error.response?.data || error.message);
    
    if (error.response?.data?.error?.includes('Stripe')) {
      console.error('\n💡 Tip: Check your STRIPE_SECRET_KEY in .env file');
    }
  }
}

async function testPaymentVerification() {
  console.log('\n🧪 Testing Payment Verification...\n');
  console.log('⚠️  This requires a valid session_id from a completed payment');
  console.log('   Run this after completing a test payment\n');
  
  const sessionId = process.argv[2]; // Get from command line
  
  if (!sessionId) {
    console.log('Usage: node test-payment.js verify [session_id]');
    return;
  }
  
  try {
    const response = await axios.post(
      `${API_URL}/api/payment/verify-payment`,
      { sessionId }
    );
    
    console.log('✅ Payment Verification Test PASSED');
    console.log('Booking ID:', response.data.booking._id);
    console.log('Status:', response.data.booking.status);
    console.log('Payment Method:', response.data.booking.paymentMethod);
  } catch (error) {
    console.error('❌ Payment Verification Test FAILED');
    console.error('Error:', error.response?.data || error.message);
  }
}

// Main function
async function runTests() {
  console.log('🚀 Payment Testing Script\n');
  console.log('API URL:', API_URL);
  console.log('='.repeat(50));
  
  const testType = process.argv[2];
  
  switch (testType) {
    case 'cash':
      await testCashPayment();
      break;
    case 'stripe':
      await testStripeCheckout();
      break;
    case 'verify':
      await testPaymentVerification();
      break;
    case 'all':
      await testCashPayment();
      await testStripeCheckout();
      break;
    default:
      console.log('\n📋 Usage:');
      console.log('  node test-payment.js cash      - Test cash payment');
      console.log('  node test-payment.js stripe     - Test Stripe checkout');
      console.log('  node test-payment.js verify [session_id] - Verify payment');
      console.log('  node test-payment.js all       - Run all tests\n');
      console.log('Example:');
      console.log('  node test-payment.js cash');
      console.log('  node test-payment.js stripe');
      console.log('  node test-payment.js verify cs_test_abc123\n');
  }
}

runTests().catch(console.error);
