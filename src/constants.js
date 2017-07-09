/**
 * Created by Ezero on 2017/7/8.
 */


import Text from './Components/Text';
import CodeMirror from './Components/CodeMirror';
import Img from './Components/Img';
import SougouTranslate from './Components/SougouTranslate';


export const Components = [
  {
    imgSrc: '',
    componentClass: Text,
    componentProps: {
      style: { width: '100%' },
      placeholder: '请输入文本',
      value: '',
      onChange(value) {
        return {
          value,
        }
      }
    },
    text: 'Text',
    desc: '文本框',
  },
  {
    imgSrc: '',
    componentClass: CodeMirror,
    componentProps: {
      style: { width: '100%' },
      value: '// 请输入代码',
      onChange(value) {
        return {
          value,
        };
      },
    },
    text: 'Code',
    desc: '代码块',
  },
  {
    imgSrc: '',
    componentClass: SougouTranslate,
    componentProps: {
      style: { width: '100%' },
      value: '// 请输入代码',
      onChange(value) {
        return {
          value,
        };
      },
    },
    text: 'Translate',
    desc: '搜狗翻译',
  },
];