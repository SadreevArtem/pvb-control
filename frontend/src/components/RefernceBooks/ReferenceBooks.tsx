import React from 'react'
import { Customers } from '../Customers/Customers';
import { Tabs } from './components/Tabs/Tabs';
import { useReferenceTabsStore } from '../../../shared/stores/referenceTabs';
import { EquipmentTypeComponent } from '../EquipmentType/EquipmentType';

export const ReferenceBooks = () => {
    const { currentTab, setTab } = useReferenceTabsStore();
    const renderContent = () => {
        switch (currentTab) {
          case "customers":
            return <Customers />;
          case "equipmentType":
            return <EquipmentTypeComponent />;
          default:
            return null; // Возвращает null, если нет совпадений
        }
      };
  return (
    <>
    <Tabs setTab={setTab} currentTab={currentTab} />
      <div className="w-full">{renderContent()}</div>
    </>
  );
}
