import { Tab, TabContent, Tabs, TabTitleText } from '@patternfly/react-core';
import React, { RefObject } from 'react';

export interface TabsShellItem {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
  contentRef?: RefObject<any>;
}

export interface TabsShellProps {
  activeKey: number;
  onSelect: (event: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent | MouseEvent, tabIndex: number) => void;
  items: TabsShellItem[];
}

export function TabsShell({ activeKey, onSelect, items }: TabsShellProps) {
  return (
    <>
      <Tabs activeKey={activeKey} onSelect={(event, eventKey) => onSelect(event, Number(eventKey))}>
        {items.map((item, index) => (
          <Tab
            eventKey={index}
            key={`${item.key}-tab`}
            tabContentId={`tab-${index}`}
            tabContentRef={item.contentRef}
            title={<TabTitleText>{item.title}</TabTitleText>}
          />
        ))}
      </Tabs>
      {items.map((item, index) => (
        <TabContent eventKey={index} key={`${item.key}-tabContent`} id={`tab-${index}`} ref={item.contentRef as any}>
          {item.content}
        </TabContent>
      ))}
    </>
  );
}


