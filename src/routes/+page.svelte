<script lang="ts">
	import Board from './Board.svelte';
	import type { State } from '$lib/interfaces/state';

	let isGameActive = false;

	let sizeX = 10;
	let sizeY = 10;
	let mineCount = 10;

	// STATES OF SQUARES
	// 0 > UNCHECKED
	// 1 > MINE
	// 2 > CHECKED

	// STATES OF FLAGS
	// 0 - UNFLAGGED
	// 1 - FLAGGED
	// 2 - QUESTION MARK

	let boardMatrix: State[][];

	const startGame = () => {
		isGameActive = true;
		
		// TODO: check that values are valid
		if (sizeX <= 0 || sizeY <= 0 || mineCount <= 0) {
			isGameActive = false;
			alert("Invalid values");
		}

		if (mineCount > sizeX * sizeY) {
			isGameActive = false;
			alert("Too many mines");
		}

		if (sizeX > 150 || sizeY > 150) {
			isGameActive = false;
			alert("Too big");
		}

		// TODO: generate board
		boardMatrix = Array.from(Array(sizeX), () => {
			return Array.from(Array(sizeY), () => {
				return {
					square: 0,
					flag: 0,
				}
			});
		});

		// TODO: generate mines
		let addedMines = 0;
		while (addedMines < mineCount) {
			let x = Math.floor(Math.random() * sizeX);
			let y = Math.floor(Math.random() * sizeY);
			if (boardMatrix[x][y].square !== 1) {
				boardMatrix[x][y].square = 1;
				addedMines++;
			}
		}

	}
</script>

<svelte:head>
	<title>Minesweeper</title>
</svelte:head>

{#if isGameActive}
	<Board {boardMatrix}></Board>
{:else}
	<div class="flex flex-col max-w-md mx-auto">
		<h1>Settings</h1>
		<label for="sizeX">Size X</label>
		<input id="sizeX" type="number" bind:value={sizeX} />
		<label for="sizeY">Size Y</label>
		<input id="sizeY" type="number" bind:value={sizeY} />
		<label for="mineCount">Mine Count</label>
		<input id="mineCount" type="number" bind:value={mineCount} />
		<button class="bg-blue-200 my-8 rounded" on:click={() => startGame()}>Start</button>
	</div>
{/if}