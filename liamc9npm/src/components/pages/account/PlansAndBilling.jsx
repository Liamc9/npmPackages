import React from 'react';
import SettingsTemplate from './SettingsTemplate'; // Adjust the path based on your folder structure
import { FaMoneyBillAlt, FaRegCreditCard, FaReceipt } from 'react-icons/fa';

const PlansAndBilling = () => {
  const billingSettings = [
    {
      category: 'Subscriptions',
      icon: FaReceipt,
      text: 'Current Plan: Pro',
      link: '/billing/subscription',
    },
    {
      category: 'Subscriptions',
      icon: FaMoneyBillAlt,
      text: 'Upgrade Plan',
      link: '/billing/upgrade',
    },
    {
      category: 'Payment Methods',
      icon: FaRegCreditCard,
      text: 'Manage Payment Methods',
      link: '/billing/payment-methods',
    },
  ];

  const handleLogout = () => {
    console.log('Log out clicked — not used on billing page');
  };

  return (
    <SettingsTemplate
      headerTitle="Plans and Billing"
      settings={billingSettings}
      onLogout={handleLogout}
    />
  );
};

export default PlansAndBilling;
