<script lang="ts">
	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<h2>{data.conversation.name}</h2>
<ul>
	{#each data.messages as { sender, body }}
		<li>{`${sender}: ${body}`}</li>
	{/each}
</ul>

<style>
	li {
		list-style: none;
		margin-bottom: 8px;
	}
</style>
