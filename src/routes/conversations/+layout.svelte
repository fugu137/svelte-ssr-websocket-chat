<script lang="ts">
	import {notifications} from "$lib/client/notifications.svelte";

	let { children, data } = $props();
</script>

<div class="layout">
	<nav>
		<ul>
			<li>
				<a href="/conversations">Conversations</a>
			</li>
			{#each data.conversations as { id, name }}
				<li>
					<a href={`/conversations/${id}`}>{name}</a>
					<div class="notification">{notifications.get(id).length}</div>
				</li>
			{/each}
		</ul>
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
		width: 420px;
		height: 100vh;
		padding: 32px 0;
		background-color: lightskyblue;
		/* box-shadow: 2px 4px 8px lightgray; */
	}
	ul {
		list-style: none;

		li {
			font-size: 1rem;
			position: relative;
			width: 100%;
			padding: 12px 24px;
			margin: 12px;
			color: white;
			text-align: center;

			.notification {
				position: absolute;
				top: 0px;
				right: -12px;
				width: 28px;
				height: 28px;
				line-height: 28px;
				text-align: center;
				background-color: red;
				border-radius: 20%;
			}
		}
	}
	main {
		position: relative;
		display: flex;
		flex-direction: column;
		row-gap: 8px;
		padding: 32px 96px;
		width: 100%;
	}
</style>
