<script lang="ts">
	import type { PageProps } from "./$types";
	import { enhance } from "$app/forms";
	import notifications from "$lib/client/notifications.svelte";
	import { invalidateAll } from "$app/navigation";

	let { data }: PageProps = $props();

	let { conversation, members, messages } = $derived(data);

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
	}

	const getUsername = (userId: number) => {
		return members.find((member) => member.id === userId)?.username;
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
	{#each notifications.get(conversation.id) as { message }}
		<li>{getUsername(message.senderId)}: {message.body}</li>
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
	li {
		list-style: none;
		margin-bottom: 8px;
	}
</style>
