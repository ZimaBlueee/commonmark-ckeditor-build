import { DecoupledEditor } from '@ckeditor/ckeditor5-editor-decoupled';
import { EditorWatchdog } from '@ckeditor/ckeditor5-watchdog';
import {builtinPlugins} from './op-plugins';
import {defaultConfig} from "./op-ckeditor-config";
import {configurationCustomizer} from './op-config-customizer';

export class ConstrainedEditor extends DecoupledEditor {}
export class FullEditor extends DecoupledEditor {}

// Export the two common interfaces
window.OPConstrainedEditor = ConstrainedEditor;
window.OPClassicEditor = FullEditor;

// Export the Watchdog feature
window.OPEditorWatchdog = EditorWatchdog;

FullEditor.createCustomized = configurationCustomizer(FullEditor);
FullEditor.builtinPlugins = builtinPlugins;
FullEditor.defaultConfig = Object.assign({}, defaultConfig);
FullEditor.defaultConfig.toolbar = {
	items: [
		// 'heading', // 标题
		'paragraph', 'heading1', 'heading2', 'heading3',
		'|',

		'imageUpload', // 图片上传
		'fontSize', // 字体大小
		// 'fontFamily',
		'fontColor', // 字体颜色
		'fontBackgroundColor', // 字体背景色
		'highlight', // 高亮

		'|',

		'bold', // 加粗
		'italic', // 斜体
		'strikethrough', // 删除线
		'link', // 超链接

		'|',

		'bulletedList', // 无序列表
		'numberedList', // 有序列表
		'todoList', // 代办列表
		// 'outdent', // 减少缩进
		// 'indent', // 增加缩进

		'|',

		'horizontalLine', // 水平线
		'insertTable', // 表格
		// 'macroList',

		'|',

		'code', // 代码
		'insertCodeBlock', // 代码片段
		'blockQuote', // 块引用

		'|',

		'opContentRevisions', // 显示本地修改
		'undo', // 撤销
		'redo', // 重做

		'|',
		// 'preview',
		// 'opShowSource',
	]
};

ConstrainedEditor.createCustomized = configurationCustomizer(ConstrainedEditor);
ConstrainedEditor.builtinPlugins = builtinPlugins;
ConstrainedEditor.defaultConfig = Object.assign({}, defaultConfig);
ConstrainedEditor.defaultConfig.toolbar = {
	items: [
		'fontColor', // 字体颜色
		'fontBackgroundColor', // 字体背景色
		'|',
		'bold',
		'italic',
		'strikethrough',
		'code',
		'insertCodeBlock',
		'link',
		'bulletedList',
		'numberedList',
		'todoList',
		'imageUpload',
		'blockQuote',
		'|',
		'opContentRevisions',
		'undo',
		'redo',
		// 'openProjectShowFormattingHelp',
		// 'preview',
		// 'opShowSource'
	]
};
