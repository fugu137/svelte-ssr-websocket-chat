<script lang="ts">
	let { children, data } = $props();
</script>

<div class="layout">
	<nav>
		<a href="/conversations">Conversations</a>
		{#each data.conversations as { id, name }}
			<a href={`/conversations/${id}`}>{name}</a>
		{/each}
	</nav>

	<main>
		{@render children()}
	</main>
</div>

<style>
	.layout {
		display: flex;
		column-gap: 16px;
	}
	nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 8px;
		width: 240px;
		height: 100vh;
		padding: 32px 0;
		background-color: antiquewhite;
		/* box-shadow: 2px 4px 8px lightgray; */
	}
	main {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		row-gap: 8px;
		padding: 32px;
	}
</style>
