import React, { useState, useEffect } from "react";
import { orderService } from "../services/orderService";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await orderService.getAllOrders();
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.totalAmount, 0);
  };

  const getOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status);
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage the farmers market platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              {orders.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              ${getTotalRevenue().toFixed(2)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Pending Orders
            </h3>
            <p className="text-3xl font-bold text-yellow-600">
              {getOrdersByStatus("PENDING").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Delivered Orders
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {getOrdersByStatus("DELIVERED").length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Orders
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Order Status Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Order Status Distribution
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      "PENDING",
                      "CONFIRMED",
                      "SHIPPED",
                      "DELIVERED",
                      "CANCELLED",
                    ].map((status) => (
                      <div
                        key={status}
                        className="text-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                            status
                          )} mb-2`}
                        >
                          {status}
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                          {getOrdersByStatus(status).length}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Orders
                  </h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            Order #{order.id.slice(-8)}
                          </p>
                          <p className="text-sm text-gray-600">
                            {formatDate(order.orderDate)}
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
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  All Orders
                </h3>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No orders found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              Order #{order.id.slice(-8)}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Customer ID: {order.customerId}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(order.orderDate)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                            <p className="text-lg font-semibold text-gray-900 mt-2">
                              ${order.totalAmount.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">
                            Order Items
                          </h5>
                          <div className="space-y-2">
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
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">
                              Shipping Address
                            </h5>
                            <p className="text-sm text-gray-600 whitespace-pre-line">
                              {order.shippingAddress}
                            </p>
                          </div>
                        )}

                        {order.notes && (
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-900 mb-2">
                              Order Notes
                            </h5>
                            <p className="text-sm text-gray-600">
                              {order.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between items-center pt-4 border-t">
                          <div className="text-sm text-gray-600">
                            <p>
                              Payment Method:{" "}
                              {order.paymentMethod || "Not specified"}
                            </p>
                            <p>
                              Payment Status:{" "}
                              {order.paymentStatus || "Not specified"}
                            </p>
                          </div>
                          <div className="space-x-2">
                            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                              Update Status
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
