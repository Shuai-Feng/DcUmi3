import React, { useState } from 'react';
import { Tabs, Card, Icon } from 'antd';
const TabPane = Tabs.TabPane;

interface ITabPagesProps {}

const TabPages: React.FunctionComponent<ITabPagesProps> = props => {
  const [tabKeys, setTabKeys] = useState('1');
  //const
  let [tabPanes, setPanels] = useState([
    { title: 'Tab 1', content: 'Content of Tab 👴', key: '1' },
    { title: 'Tab 2', content: 'Content of Tab 👵', key: '2' },
    { title: 'Tab 3', contendt: 'Content of Tab 👆', key: '3' },
  ]);

  //面板界面 添加 面板
  let addPanel = () => {
    const activekey: string = (+new Date()).toString();
    tabPanes.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      key: activekey,
    });
    setPanels(tabPanes);
    setTabKeys(activekey);
  };

  //删除面板
  let removePanel = (targetkey: string) => {
    if (tabPanes.length == 1) {
      return;
    }

    tabPanes = tabPanes.filter(pane => {
      return pane.key !== targetkey;
    });
    setPanels(tabPanes);
  };

  return (
    <div className="TabPage">
      <Card title="Tab页签" style={{ marginBottom: 10 }}>
        <Tabs>
          <TabPane tab="Tab 1" key="1">
            吃小亏 占大便宜
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            吃个人？
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            饿灵失望
          </TabPane>
        </Tabs>
      </Card>
      <Card title="带图的页签" style={{ marginBottom: 10 }}>
        <Tabs>
          <TabPane
            tab={
              <span>
                <Icon type="step-forward" />
                Tab1
              </span>
            }
            key="1"
          >
            优秀的人 变得更优秀
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="highlight" />
                Tab1
              </span>
            }
            key="2"
          >
            吃个人？
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="strikethrough" />
                Tab1
              </span>
            }
            key="3"
          >
            无情鲨手
          </TabPane>
        </Tabs>
      </Card>
      <Card title="带图关闭的页签">
        <Tabs
          type="editable-card"
          activeKey={tabKeys}
          // 面板切换所需的回调函数
          onChange={activeKey => {
            setTabKeys(activeKey);
          }}
          onEdit={(targetkey: any, action) => {
            if (action == 'add') {
              addPanel();
            }
            if (action == 'remove') {
              removePanel(targetkey);
            }
          }}
        >
          {tabPanes.map((item: any) => {
            return (
              <TabPane tab={item.title} key={item.key}>
                {item.content}
              </TabPane>
            );
          })}
        </Tabs>
      </Card>
    </div>
  );
};

export default TabPages;
