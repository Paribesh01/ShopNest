import React from 'react';

const RefundPolicy = () => {
  return (
    <div className="p-6   rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Refund and Cancellation Policy</h2>
      <p className="mb-4">We are ready to give you the best!</p>
      <p className="mb-4">
        We understand that sometimes, plans change. If you can no longer make it to an order, please email us in advance at <a href="mailto:houseofaesthetics154@gmail.com" className="text-blue-500">houseofaesthetics154@gmail.com</a>. Refunds will be made as per the policies mentioned below. We strive to maintain the highest standards of quality, and as with everything we do at House of Aesthetics, you get a 100% Satisfaction Guarantee.
      </p>

      <h3 className="text-xl font-semibold mb-2">POLICY A</h3>
      <p className="mb-4">Policy A applies to all House of Aesthetics products.</p>

      <h4 className="font-semibold mb-1">Cancellations prior to order shipment:</h4>
      <p className="mb-4">If you wish to cancel your order before it has been shipped, we will refund the full amount to you.</p>

      <h4 className="font-semibold mb-1">Withdrawals after receiving the product:</h4>
      <p className="mb-4">
        If you are not satisfied with your purchase and wish to request a refund, please contact us within 7 days of receiving the product. We will process a refund for you—no questions asked—provided the product is in its original condition and packaging.
      </p>
      <p className="mb-4">
        However, once you have used or opened the product, you will not be eligible for a refund.
      </p>

      <h4 className="font-semibold mb-1">No admission transfer from one customer to another.</h4>

      <h4 className="font-semibold mb-1">Transfers to another product:</h4>
      <p className="mb-4">
        You are free to request an exchange for a different product at no extra charge, as long as the exchange request is made within 7 days of receiving the product.
      </p>

      <h4 className="font-semibold mb-2">NOTE:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>All cancellation and exchange requests must be notified to us by email at <a href="mailto:houseofaesthetics154@gmail.com" className="text-blue-500">houseofaesthetics154@gmail.com</a>.</li>
        <li>You are not eligible for refunds if you have used or opened the product.</li>
        <li>All refunds will be credited back to your account within 10-15 business days of the refund request.</li>
        <li>Refunds or credits for exchanges cannot be issued for non-attendance or failure to respond.</li>
      </ul>
    </div>
  );
};

export default RefundPolicy;
