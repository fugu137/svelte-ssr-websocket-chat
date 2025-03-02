<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from '$app/forms';
	import client from "$lib/client/client.svelte";

	let { data }: PageProps = $props();

	let { conversation, users, messages } = $derived(data);

	let message = $state<string>("");

	const getUsername = (userId: number) => {
		return users.find((user) => user.id === userId)?.username;
	}
</script>

<h2>{conversation.name}</h2>
<ul>
	{#each messages as { senderId, body }}
		<li>{`${getUsername(senderId)}: ${body}`}</li>
	{/each}
</ul>

<h3>Notifications</h3>
<ul>
	{#each client.notifications as { message }}
		<li>{getUsername(message.senderId)}: {message.body}</li>
	{/each}
</ul>

<form method="POST" use:enhance>
	<input type="text" name="message" bind:value={message} />
	<button>Send</button>
</form>

<style>
	li {
		list-style: none;
		margin-bottom: 8px;
	}
</style>
