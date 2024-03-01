document.getElementById('sendButton').addEventListener("click", function (event) {
	event.preventDefault();
	document.getElementById('loading').style.display = 'flex';
	const url = 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions';
	let input = document.getElementById('messageInput').value
	console.log(input);
	const options = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': '0262cf5b59mshff60641ff9c3f77p1d212ajsn150f2e7f1707',
			'X-RapidAPI-Host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'
		},
		body: JSON.stringify({
			messages: [
				{
					role: 'user',
					content: `${input}`
				}
			],
			model: 'gpt-4-turbo-preview',
			max_tokens: 500,
			temperature: 0.9
		})
	};
	let userIP = document.getElementById('messageInput').value
	if (userIP != '') {
		document.getElementById('Output').innerHTML += `<p id="userInput">
		<p style="font-weight: bold;"> <img src="img/user.svg" alt="user" width="33vw"> USER</p>
		<p style="padding:0px 35px;">
		${userIP}
		</p>
		</p>`
	}

	document.getElementById('clear').addEventListener("click", () => {
		document.getElementById('Output').innerHTML = ''
	})
	const getResponse = async () => {

		try {
			const response = await fetch(url, options);
			const result = await response.json();
			if (userIP != '') {
				document.getElementById('Output').innerHTML
					+= `
				<p id="output">
				<p style="font-weight: bold;"> <img src="img/chatgpt.svg" alt="user" width="29vw"> ChagaGPT</p>
				<p style="padding:0px 30px;">
				${result.choices[0].message.content}
				</p>
				</p>`
				
				document.getElementById('loading').style.display = 'none';
			} else { alert('No Input') }
			
		} catch (error) {
			console.error(error);
			if (userIP != '') {
				document.getElementById('Output').innerHTML
				+= `     
                <p>
				<img src="img/chatgpt.svg" alt="user" width="29vw"> ChagaGPT
				<p class="error">
				${error} <br>NET_ERR_NOT_CONNECTED :(
					</p>
					</p>`
					document.getElementById('loading').style.display = 'none';
			} else { alert("Enter Prompt") }
		}
	}
	document.getElementById('sendButton').addEventListener("click", getResponse())
});