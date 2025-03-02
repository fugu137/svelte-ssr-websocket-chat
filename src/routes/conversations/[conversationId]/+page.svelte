<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";
	import client from "$lib/client/client.svelte";
	import { invalidateAll } from "$app/navigation";

	let { data }: PageProps = $props();

	let { conversation, users, messages } = $derived(data);

	let message = $state<string>("");
	let sending = $state<boolean>(false);

	$effect(() => {
		const notifications = client.getNotifications();

		if (notifications.length) {
			fetchLatestMessages();
		}
	});

	const fetchLatestMessages = () => {
		invalidateAll();

		client.clearNotifications();
	}

	const getUsername = (userId: number) => {
		return users.find((user) => user.id === userId)?.username;
	};
</script>

<h2>{conversation.name}</h2>
<ul>
	{#each messages as { senderId, body }}
		<li>{`${getUsername(senderId)}: ${body}`}</li>
	{/each}
</ul>

<h3>Notifications</h3>
<ul>
	{#each client.getNotifications() as { message }}
		<li>{getUsername(message.senderId)}: {message.body}</li>
	{/each}
</ul>

<form
	method="POST"
	use:enhance={() => {
		sending = true;

		return async ({ update }) => {
			await update();
			
			sending = false;

			invalidateAll();
		};
	}}
>
	<input type="text" name="message" bind:value={message} />
	<button>Send</button>
</form>

{#if sending}
	<p>Sending...</p>
{/if}

<style>
	li {
		list-style: none;
		margin-bottom: 8px;
	}
</style>
