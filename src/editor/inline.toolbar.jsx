import React from 'react';

import {
  BoldButton,
  ItalicButton,
  // UnderlineButton,
  StrikeThroughButton
} from './plugins/format';

import { getVisibleSelectionRect } from './utils';
import { useEsc } from '../hooks/onEsc'

import styles from './editor.module.css';

export function InlineToolbar({
  editor
}) {
  let toolbarRef = React.useRef();
  if (!editor) {
    //
  } else if (!editor.value.selection.isExpanded) {
    toolbarRef.current.setAttribute("style", `left:-999px; top: 0px; opacity:0;`);
  } else if (editor !== null) {
    requestAnimationFrame(() => {
      let selectionRect = getVisibleSelectionRect();
      if (!selectionRect) return;
      let sectionMidX = selectionRect.left + (selectionRect.width / 2);
      let toolBarElemPos = toolbarRef.current.getBoundingClientRect();
      let top = selectionRect.top - (toolBarElemPos.height + 10);
      let left = sectionMidX - (toolBarElemPos.width / 2);
      //find center position of select
      if (toolbarRef.current) {
        toolbarRef.current.setAttribute("style", `left:${left}px; top: ${top}px; opacity:1;`);
      }
    });
  }

  useEsc(React.useCallback(function () {
    toolbarRef.current.setAttribute("style", `left:-999px; top: 0px; opacity:0;`);
  }, []))

  return (
    <div ref={toolbarRef} className={styles.inlineToolbar}>
      <BoldButton editor={editor} />
      <ItalicButton editor={editor} />
      {/* <UnderlineButton editor={editor} /> */}
      <StrikeThroughButton editor={editor} />
    </div>
  )
}