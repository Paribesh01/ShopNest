import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="p-6  rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Shipping Policy</h2>
      <p className="mb-4">At House of Aesthetics, we strive to ensure that your order is delivered to you as quickly as possible. Please find below our shipping timelines:</p>

      <h3 className="text-xl font-semibold mb-2">Shipping Timeline</h3>
      <p className="font-semibold mb-1">Processing Time:</p>
      <p className="mb-4">All orders are processed within <strong>1-3 business days</strong>. You will receive a confirmation email once your order has been shipped.</p>

      <h4 className="font-semibold mb-1">Shipping Methods and Delivery Times:</h4>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Standard Shipping:</strong>
          <br />
          Minimum Delivery Time: <strong>3-5 business days</strong>
          <br />
          Maximum Delivery Time: <strong>7-10 business days</strong>
        </li>
        <li>
          <strong>Express Shipping:</strong>
          <br />
          Minimum Delivery Time: <strong>1-2 business days</strong>
          <br />
          Maximum Delivery Time: <strong>3-5 business days</strong>
        </li>
      </ul>

      <h4 className="font-semibold mb-2">Note:</h4>
      <p className="mb-4">
        Delivery times may vary depending on your location and any potential delays caused by external factors, such as carrier disruptions or holidays.
        We are not responsible for delays caused by natural disasters or unforeseen circumstances that may affect shipping.
      </p>

      <p>If you have any questions or concerns regarding your order or shipping, please feel free to contact us at <a href="mailto:houseofaesthetics154@gmail.com" className="text-blue-500">houseofaesthetics154@gmail.com</a>.</p>
    </div>
  );
};

export default ShippingPolicy;
