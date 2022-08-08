export enum Sender {
	React,
	Content,
}

export interface ChromeMessage {
	from: Sender;
	message: any;
}

const messagesFromReactAppListener = (
	message: ChromeMessage,
	sender: any,
	response: any
) => {
	console.log('[content.ts]. Message received', {
		message,
		sender,
	});

	if (
		sender.id === chrome.runtime.id &&
		message.from === Sender.React &&
		message.message === 'LOG_IN_CALLBACK'
	) {
		response(true);
	}
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
