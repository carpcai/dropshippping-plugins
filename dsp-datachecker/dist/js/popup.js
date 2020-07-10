// 打开后台页
$('#open-index').click(e => {
	window.open(chrome.extension.getURL('/index.html'));
});