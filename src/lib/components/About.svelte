<script>
	import * as Avatar from '$lib/components/ui/avatar';
</script>

<section>
	<div class="m-4 flex flex-col items-center justify-center">
		<h1 class="size-10 w-full text-center font-bold">About Me</h1>
		<div class=" flex flex-col items-center">
			<Avatar.Root class="h-40 w-40">
				<Avatar.Image src="src\lib\static\guy_placeholder.webp" alt="guy_placeholder" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>
			<p class="text-center font-mono">
				Here you can introduce yourself or the page content. You can describe your education,
				experience, skills, or whatever you want to share about yourself or the subject of the page.
			</p>
		</div>
	</div>
</section>
