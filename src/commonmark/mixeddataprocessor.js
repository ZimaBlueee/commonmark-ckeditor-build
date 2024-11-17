import {HtmlDataProcessor, DomConverter} from '@ckeditor/ckeditor5-engine';
import CommonMarkDataProcessor from './commonmarkdataprocessor';

export default class MixedDataProcessor {
	constructor(document) {
		console.log('MixedDataProcessor===》', document);
		this._htmlDP = new HtmlDataProcessor(document);
		this._markdownDP = new CommonMarkDataProcessor(document);
		this._domConverter = new DomConverter(document);

		// 初始化状态变量，未确定内容类型
		this.isMarkdown = null;
	}

	// toView(data) {
	// 	console.log('toView===>', data);
	//
	// 	// 如果尚未确定内容类型，则判断一次
	// 	if (this.isMarkdown === null) {
	// 		if (this.containsMarkdownSyntax(data)) {
	// 			this.isMarkdown = true;
	// 			console.warn('toView is MD')
	// 		} else {
	// 			this.isMarkdown = false;
	// 			console.warn('toView is HTML')
	// 		}
	// 	}
	//
	// 	// if (this.isMarkdown === null) {
	// 	// 	const tempViewFragment = this._markdownDP.toView(data);
	// 	// 	// 检查 tempViewFragment 中是否包含 Markdown 特有的元素
	// 	// 	if (this.isMd(tempViewFragment)) {
	// 	// 		this.isMarkdown = true;
	// 	// 		console.warn('toView is MD')
	// 	// 	} else {
	// 	// 		this.isMarkdown = false;
	// 	// 		console.warn('toView is HTML')
	// 	// 	}
	// 	// }
	//
	// 	if (this.isMarkdown) {
	// 		return this._markdownDP.toView(data);
	// 	} else {
	// 		return this._htmlDP.toView(data);
	// 	}
	// }


	toView(data) {
		if (this.isMarkdown === null) {
			// 去除所有的 <figure>...</figure> 标签及其中的内容
			let cleanedData = data.replace(/<figure[\s\S]*?<\/figure>/gi, '');

			// 去除所有的 <img> 标签
			cleanedData = cleanedData.replace(/<img[\s\S]*?>/gi, '');

			// 去除所有的 <br> 标签
			cleanedData = cleanedData.replace(/<br\s*\/?>/gi, '');

			// 检查数据中是否包含 HTML 标签
			const htmlTagRegex = /<\/?[a-z][\s\S]*?>/i;
			const containsHtmlTags = htmlTagRegex.test(cleanedData);

			// 检查数据中是否包含 Markdown 语法
			const markdownSyntaxRegex = /(^|\s)(#{1,6}\s|[*_`~+-]|(?:\n\s{0,3}>\s))/m;
			const containsMarkdownSyntax = markdownSyntaxRegex.test(cleanedData);

			if (containsHtmlTags && !containsMarkdownSyntax) {
				// 仅包含 HTML 标签，没有 Markdown 语法，确定为 HTML 内容
				this.isMarkdown = false;
				console.warn('仅包含 HTML 标签，没有 Markdown 语法，确定为 HTML 内容')
			} else if (!containsHtmlTags && containsMarkdownSyntax) {
				// 不包含 HTML 标签，包含 Markdown 语法，确定为 Markdown 内容
				this.isMarkdown = true;
				console.log('不包含 HTML 标签，包含 Markdown 语法，确定为 Markdown 内容');
			} else if (!containsHtmlTags && !containsMarkdownSyntax) {
				// 既不包含 HTML 标签，也不包含 Markdown 语法，确定为 HTML 内容
				this.isMarkdown = false;
				console.warn('既不包含 HTML 标签，也不包含 Markdown 语法，确定为 HTML 内容')
			} else {
				// 同时包含 HTML 标签和 Markdown 语法，确定为 HTML 内容
				this.isMarkdown = false;
				alert("该条OP保存后可能会格式错乱，请先联系管理员，或者拨打分机2826")
				console.warn('同时包含 HTML 标签和 Markdown 语法，确定为 HTML 内容')
			}
		}

		if (this.isMarkdown) {
			return this._markdownDP.toView(data);
		} else {
			return this._htmlDP.toView(data);
		}
	}


	toData(viewFragment) {
		if (this.isMarkdown) {
			return this._markdownDP.toData(viewFragment);
		} else {
			return this._htmlDP.toData(viewFragment);
		}
	}

	// containsMarkdownSyntax(data) {
	// 	// 检查数据中是否包含Markdown特有的语法
	// 	const markdownSyntaxRegex = /(^|\s)([*_#`~>+-])/m;
	// 	return markdownSyntaxRegex.test(data);
	// }
	//
	// isHtml(data) {
	// 	const htmlRegex = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
	// 	return htmlRegex.test(data);
	// }
	//
	// isMd(viewFragment) {
	// 	// 将viewFragment转换为DOM片段
	// 	const domFragment = this._domConverter.viewToDom(viewFragment, document);
	//
	// 	// 定义Markdown常用的元素标签列表
	// 	const mdTags = ['strong', 'em', 'code', 'pre', 'blockquote', 'a', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li'];
	//
	// 	// 创建一个DOM遍历器
	// 	const walker = document.createTreeWalker(domFragment, NodeFilter.SHOW_ELEMENT, null, false);
	//
	// 	// 遍历DOM节点
	// 	while (walker.nextNode()) {
	// 		const node = walker.currentNode;
	//
	// 		if (node.nodeType === Node.ELEMENT_NODE) {
	// 			const tagName = node.tagName.toLowerCase();
	//
	// 			console.log('isMd判断前===》', tagName)
	//
	// 			// 检查是否在Markdown标签列表中
	// 			if (mdTags.includes(tagName)) {
	// 				console.log('isMd判断后===》', tagName)
	// 				return true;
	// 			}
	// 		}
	// 	}
	//
	// 	// 如果没有找到Markdown元素，返回false
	// 	return false;
	// }

}
