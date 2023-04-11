# Summarizer extension

Completely free and semi-open source chrome extension that summarizes the page you are at with the help of chatGPT-3.5. Doesn't use ads or any type of promotion nor uses your private data.

## Features

**Set the summary length**
You can set it in words or in characters. As of now it's not 100% accurate (it may be some words/characters off), but it'll try its best to adjust to the required length. If you want the summary in bullet points (read below), the length limiter won't work, as it requires a different query engineering that is not ready yet.

**Set keywords**
You can ask the AI to focus on specific topics when summarizing. If you are reading, for example, someone's biography, you can make it focus in the political career of that someone. Simply introduce a keyword in the keywords field and press enter or click "Add".

**Summarize en bullet points**
You cand summarize the page in a regular text format or in bullet points.

**Use a limited free API**
As a "demo", you can connect to chatGPT API Key for free but only for a limited use (usually it will last between 2 and 4 queries). If you want to use the extension as expected, you should set your own API Key (see below).

**Use your own FREE API Key**
You can click at the top side "Add tokens (free)" and then you'll be able to introduce your own API Key from chatGPT. It only requires you to set an account with openai and then you can create a free key. The key is limited but allows quite a broad number of requests.

## State of the extension (DISCLAIMER!)

This extension is currently in its first release so it may have unexpected bugs that still require some work on. Please, feel free to contribute to this repository if there's anything you believe it could be improved.

## Open Source and Data Privacy

This project is only "semi" open source because some files could pose security concerns and allow exploits of the public API Key. There are actually not many files hidden so the code is perfectly understandable without them.

About privacy: This extension DOES NOT use your data in any way. It doesn't even have access to it. The only data it uses is your API Key, if you voluntarily decide to introduce it. And its use is only for its intended purpose, nothing else. You can actually verify by yourself everything stated here, by reading the code and by inspecting the extension's network (you'll see that the only request done is to chatGPT).

![Extension summarizing a page](https://s2.gifyu.com/images/testa6b85638acd9d54d.gif)
