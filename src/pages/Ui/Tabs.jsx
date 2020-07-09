import * as React from 'react';
import { Card, Tabs, message, Icon } from 'antd';
const TabPane = Tabs.TabPane;

export default class App extends React.Component {
  state = {
    activeKey: '',
    panes: [],
  };
  onChange = activeKey => {
    this.setState({
      activeKey,
    });
  };
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: 'New Tab',
      content: 'Content of new Tab',
      key: activeKey,
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  handleCallback = key => {
    message.info('Hi,您选择了页签：' + key);
  };
  UNSAFE_componentWillMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1',
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2',
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3',
      },
    ];
    this.setState({
      activeKey: panes[0].key,
      panes,
    });
  }

  render() {
    return (
      <div>
        <Card title="tab标签页" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab1" key="1">
              欢迎学习React课程1
            </TabPane>
            <TabPane tab="Tab2" key="2">
              欢迎学习React课程2
            </TabPane>
            <TabPane tab="Tab3" key="3">
              欢迎学习React课程3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab标签" className="card-warp">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  Tab1
                </span>
              }
              key="1"
            >
              123
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="edit" />
                  Tab2
                </span>
              }
              key="2"
            >
              123
            </TabPane>
            <TabPane
              tab={
                <span>
                  <Icon type="delete" />
                  Tab3
                </span>
              }
              key="3"
            >
              234
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的标签" className="card-warp">
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            onEdit={this.onEdit}
            type="editable-card"
          >
            {this.state.panes.map(panel => {
              return <TabPane tab={panel.title} key={panel.key} />;
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}
