import * as React from 'react';
import { Card, Modal, Button } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
//引入相关属性
import { EditorState } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';
//可以通过二次声明类型进行 蒙 混 过 关
declare type RawDraftContentState = any;

export interface IAppProps {}

export interface IAppState {
  isVisible: boolean;
  showRichText: boolean;
  editorContent: any;
  editorState: any;
}

export default class App extends React.Component<IAppProps, IAppState> {
  state = {
    isVisible: false,
    showRichText: false,
    editorContent: undefined,
    editorState: undefined,
  };
  onEditorChange = (editorContent: any) => {
    this.setState({
      editorContent,
    });
  };
  onEditorStateChange = (editorState: any) => {
    this.setState({
      editorState,
    });
  };
  handleRichShow = () => {
    this.setState({
      isVisible: true,
    });
  };
  handleRichClear = () => {
    this.setState({
      editorState: '',
    });
  };

  public render() {
    const { editorState } = this.state;
    let darftText: RawDraftContentState = this.state.editorContent;
    return (
      <div>
        <Card title="标题按钮">
          <Button
            type="primary"
            style={{ marginRight: 10 }}
            onClick={this.handleRichShow}
          >
            查看文本
          </Button>
          <Button type="primary" onClick={this.handleRichClear}>
            清空富文本
          </Button>
        </Card>
        <Card title="富文本编辑器">
          <Editor
            editorState={editorState}
            onContentStateChange={this.onEditorChange}
            onEditorStateChange={this.onEditorStateChange}
          />
        </Card>
        <Modal
          title="富文本"
          visible={this.state.isVisible}
          onCancel={() => {
            this.setState({
              isVisible: false,
            });
          }}
          footer={null}
        >
          {draftjs(darftText)}
        </Modal>
      </div>
    );
  }
}
