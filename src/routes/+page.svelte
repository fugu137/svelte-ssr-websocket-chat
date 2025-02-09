<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageProps } from "./$types";

	let { form }: PageProps = $props();
</script>

<main>
	<h1>Svelte WebSocket Chat</h1>

	<section>
		<form method="POST" use:enhance>
			<label>
				Username:
				<input type="text" name="username" />
			</label>
			<label>
				Password:
				<input type="password" name="password" />
			</label>
			<button>Log In</button>

			{#if form?.missing}
				<p class="error">{`The ${!form.username ? "username" : "password"} field is required`}</p>
			{/if}
			{#if form?.invalid}
				<p class="error">Invalid credentials. Please try again.</p>
			{/if}
		</form>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 64px;
	}
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 32px;
	}
	form {
		width: 60%;
		padding: 36px;
		margin: 32px 0;
		box-shadow: 4px 4px 24px lightgrey;

		input {
			width: 100%;
			padding: 4px;
			margin-bottom: 16px;
		}
		button {
			width: 100%;
			padding: 4px;
			margin: 12px 0;
		}
		.error {
			color: red;
		}
	}
</style>
