import {userMentions} from "./mentions/user-mentions";
import {workPackageMentions} from "./mentions/work-package-mentions";
import {customItemRenderer, emojiItemRenderer} from './mentions/mentions-item-renderer';
import {emojiMentions} from "./mentions/emoji-mentions";
import {saveInLocalStorage} from "./plugins/op-content-revisions/storage";

import COLORS from './config/colors';

export const defaultConfig = {
	autosave: {
		waitingTime: 5000,
		save(editor) {
			return saveInLocalStorage(editor);
		},
	},
	heading: {
		options: [
			{model: 'paragraph', title: '正文', class: 'ck-heading_paragraph'},
			{model: 'heading1', view: 'h1', title: '一级标题', class: 'ck-heading_heading1'},
			{model: 'heading2', view: 'h2', title: '二级标题', class: 'ck-heading_heading2'},
			{model: 'heading3', view: 'h3', title: '三级标题', class: 'ck-heading_heading3'},
			// {model: 'heading4', view: 'h4', title: '四级标题', class: 'ck-heading_heading4'},
			// {model: 'heading5', view: 'h5', title: '五级标题', class: 'ck-heading_heading5'}
		]
	},
	toolbar: {
		// Will be defined by each build
	},
	OPMacroEmbeddedTable: {
		toolbar: [
			'opEditEmbeddedTableQuery',
		]
	},
	OPMacroWpButton: {
		toolbar: [
			'opEditWpMacroButton',
		]
	},
	OPWikiIncludePage: {
		toolbar: [
			'opEditWikiIncludeMacroButton',
		]
	},
	OPCodeBlock: {
		toolbar: [
			'opEditCodeBlock',
		]
	},
	OPChildPages: {
		toolbar: [
			'opEditChildPagesMacroButton',
		]
	},
	image: {
		insert: {
			// Default to inline image type by default
			type: 'inline',
		},
		resizeUnit: 'px',
		resizeOptions: [
			{
				name: 'imageResize:original',
				value: null,
				icon: 'original'
			},
			{
				name: 'imageResize:50',
				value: '50',
				icon: 'medium'
			},
			{
				name: 'imageResize:75',
				value: '75',
				icon: 'large'
			}
		],
		toolbar: [
			'toggleImageCaption',
			'imageTextAlternative',
			'|',
			'imageStyle:inline',
			'imageStyle:block',
			'|',
			'imageResize:original'
		]
	},
	table: {
		contentToolbar: [
			'tableColumn', 'tableRow', 'mergeTableCells',
			'tableProperties', 'tableCellProperties'
		]
	},

	mention: {
		feeds: [
			{
				marker: '@',
				feed: userMentions,
				itemRenderer: customItemRenderer,
				minimumCharacters: 0
			},
			{
				marker: '#',
				feed: workPackageMentions,
				itemRenderer: customItemRenderer,
				minimumCharacters: 1
			},
			{
				marker: ':',
				feed: emojiMentions,
				itemRenderer: emojiItemRenderer,
				minimumCharacters: 1
			}
		]
	},

	fontSize: {
		options: [10, 12, 14, 'default', 18, 20, 22],
		supportAllValues: true,
	},
	fontColor: {
		columns: 12,
		colors: COLORS,
	},
	fontBackgroundColor: {
		columns: 12,
		colors: COLORS,
	},

	highlight: {
		options: [
			{
				model: 'yellowMarker',
				class: 'marker-yellow',
				title: '黄色高亮',
				color: 'var(--ck-highlight-marker-yellow)',
				type: 'marker'
			},
			{
				model: 'greenMarker',
				class: 'marker-green',
				title: '绿色高亮',
				color: 'var(--ck-highlight-marker-green)',
				type: 'marker'
			},
			{
				model: 'pinkMarker',
				class: 'marker-pink',
				title: '粉色高亮',
				color: 'var(--ck-highlight-marker-pink)',
				type: 'marker'
			},
			{
				model: 'blueMarker',
				class: 'marker-blue',
				title: '蓝色高亮',
				color: 'var(--ck-highlight-marker-blue)',
				type: 'marker'
			},
		]
	},

	language: 'en'
};
