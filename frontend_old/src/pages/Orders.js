import React, { useState, useEffect } from "react";
import { orderService } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await orderService.getCustomerOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-blue-100 text-blue-800";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">
            Track your order history and status
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No orders yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start shopping to see your orders here!
            </p>
            <a
              href="/products"
              className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.id.slice(-8)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                      <p className="text-lg font-semibold text-gray-900 mt-1">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Order Items
                  </h4>
                  <div className="space-y-3">
                    {order.orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.productName}
                          </p>
                          <p className="text-sm text-gray-600">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${item.unitPrice.toFixed(2)} each
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: ${item.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.shippingAddress && (
                  <div className="px-6 py-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Shipping Address
                    </h4>
                    <p className="text-sm text-gray-600 whitespace-pre-line">
                      {order.shippingAddress}
                    </p>
                  </div>
                )}

                {order.notes && (
                  <div className="px-6 py-4 bg-gray-50">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Order Notes
                    </h4>
                    <p className="text-sm text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
