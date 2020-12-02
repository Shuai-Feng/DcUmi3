import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
interface IRichPageProps {}

const RichPage: React.FunctionComponent<IRichPageProps> = props => {
  //
  const [editState, setEditState] = useState(EditorState.createEmpty());
  const [contentState, setContentState] = useState<any>('');
  const [modalVisivle, setVisible] = useState(false);
  //清空富文本框中的内容

  //清空富文本容器里的内容
  let handleContentClear = () => {
    setEditState(EditorState.createEmpty());
  };

  //查看富文本中的内容
  let hanldeGetText = () => {
    setVisible(true);
  };

  let handleEditorStateChange = (editorState: any) => {
    console.log(editorState);
    setEditState(editorState);
  };
  let handleContentStateChange = (cotentState: any) => {
    setContentState(cotentState);
  };
  return (
    <div className="RichPage">
      <Card>
        <Button style={{ marginRight: 10 }} onClick={hanldeGetText}>
          查看内容
        </Button>
        <Button onClick={handleContentClear}>清空内容</Button>
      </Card>
      <Card title="富文本编辑器">
        <Editor
          editorState={editState}
     
          onEditorStateChange={handleEditorStateChange}
          onContentStateChange={handleContentStateChange}
        />
      </Card>
      <Modal
        visible={modalVisivle}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        {//@ts-ignore
        draftjs(contentState)}
      </Modal>
    </div>
  );
};

export default RichPage;
