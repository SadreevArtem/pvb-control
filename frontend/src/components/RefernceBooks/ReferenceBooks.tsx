import React, { useState } from 'react'
import { References } from './types';
import { Customers } from '../Customers/Customers';
import { Tabs } from './components/Tabs/Tabs';

export const ReferenceBooks = () => {
    const [tab, setTab]= useState<References>("customers");
    const renderContent = () => {
        switch (tab) {
          case "customers":
            return <Customers />;
          
          // case "orders":
          //   return <Orders />;
          default:
            return null; // Возвращает null, если нет совпадений
        }
      };
  return (
    <>
    <Tabs setTab={setTab} currentTab={tab} />
      <div className="w-full">{renderContent()}</div>
    </>
  );
}
