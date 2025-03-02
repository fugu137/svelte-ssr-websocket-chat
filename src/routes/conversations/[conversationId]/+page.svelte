<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";
	import notifications from "$lib/client/notifications.svelte";
	import { invalidateAll } from "$app/navigation";

	let { data }: PageProps = $props();

	let { user, conversation, members, messages } = $derived(data);

	let message = $state<string>("");
	let isSending = $state<boolean>(false);

	$effect(() => {
		if (notifications.get(conversation.id)?.length) {
			fetchLatestMessages();
		}
	});

	const fetchLatestMessages = () => {
		invalidateAll();

		notifications.clear(conversation.id);
	};

	const getUsername = (userId: number) => {
		return members.find((member) => member.id === userId)?.username;
	};
</script>

<h2>{conversation.name}</h2>
<ul>
	{#each messages as { senderId, body }}
		<li>
			<div class={senderId === user.id ? "body sent" : "body received"}>{body}</div>
			<div class={senderId === user.id ? "sender sent" : "sender received"}>
				Sent by: {getUsername(senderId)}
			</div>
		</li>
	{/each}
</ul>

<form
	method="POST"
	use:enhance={() => {
		isSending = true;

		return async ({ update }) => {
			await update();

			isSending = false;

			invalidateAll();
		};
	}}
>
	<input type="text" name="message" bind:value={message} />
	<button>Send</button>
</form>

{#if isSending}
	<p>Sending...</p>
{/if}

<style>
	h2 {
		text-align: center;
		margin-bottom: 24px;
	}
	ul {
		width: 100%;
		height: 100%;
		padding: 24px;

		li {
			list-style: none;
			margin-bottom: 16px;

			.body {
				padding: 12px 24px;
				width: auto;
				color: white;
				border-radius: 50vh;

				&.sent {
					background-color: blueviolet;
				}
				&.received {
					background-color: royalblue;
				}
			}

			.sender {
				font-size: 0.8rem;
				padding: 4px 16px;
				text-align: right;
			}

			.sent {
				margin-right: 25%;
			}
			.received {
				margin-left: 25%;
			}
		}
	}
	form {
		margin-bottom: 48px;

		* {
			font-size: 1rem;
		}

		input {
			width: calc(100% - 108px);
			padding: 10px;
		}
		button {
			padding: 10px 0;
			width: 100px;
		}
	}
</style>
