import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CKEditorComponent extends Component {
  render() {
    const { name, value, onUpdate } = this.props;
    return (
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onInit={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('rrrr cx Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          console.log({ rrrr: 'rrrr ck', event, editor, data });
        }}
        onBlur={(event, editor) => {
          const data = editor.getData();
          console.log('rrrr ck Blur. ', editor);
          onUpdate(name, data);
        }}
        onFocus={(event, editor) => {
          console.log('rrrr ck Focus.', editor);
        }}
      />
    );
  }
}

export default CKEditorComponent;
