import p5 from 'p5';

export function sketch(p: p5) {
	const ARTIFACTS_COUNT = 15;
	const PARTICLES_COUNT = 200;
	let particles: any[] = [];
	let artifacts: any[] = [];

	// Pastel color palette
	const palette = ['#FFC0CB', '#B0E0E6', '#98FB98', '#FFE4B5', '#DDA0DD', '#FFDAB9'];

	p.setup = () => {
		p.createCanvas(600, 400);
		p.rectMode(p.CENTER);
		p.noLoop();

		// Setup artifacts
		for (let i = 0; i < ARTIFACTS_COUNT; i++) {
			artifacts.push({
				x: p.random(p.width),
				y: p.random(p.height),
				angle: p.random(p.TWO_PI),
				size: p.random(50, 120),

				colorIndex: p.random(palette.length),

				xOffset: p.random(1000),
				yOffset: p.random(1000),

				angleOffset: p.random(1000),
				shapeOffset: p.random(1000),
				alphaOffset: p.random(1000),

				numCircles: p.floor(p.random(2, 4))
			});
		}

		// Setup background particles
		for (let i = 0; i < PARTICLES_COUNT; i++) {
			particles.push({
				x: p.random(p.width),
				y: p.random(p.height),

				vx: p.random(-0.2, 0.2),
				vy: p.random(-0.2, 0.2),

				size: p.random(1, 2.5),
				alpha: p.random(20, 80)
			});
		}

		p.background('#F0F2FA');

		drawParticles();
		drawGrid();
		drawFlower();
		drawX(p.width - 45, 45, 14);
		drawX(p.width - 75, 45, 12);
		drawX(p.width - 105, 45, 10);

		for (let art of artifacts) {
			const padding = 50;

			const noiseX = p.noise(art.xOffset);
			art.x = p.map(noiseX, 0, 1, -padding, p.width + padding);

			const noiseY = p.noise(art.yOffset);
			art.y = p.map(noiseY, 0, 1, -padding, p.height + padding);

			const noiseAngle = p.noise(art.angleOffset);
			art.angle = p.map(noiseAngle, 0, 1, -p.TWO_PI, p.TWO_PI);

			// Static: No updates to offsets

			p.push();
			p.translate(art.x, art.y);
			p.rotate(art.angle);
			p.noStroke();

			drawCircleCluster(art);

			p.pop();
		}

		drawGeometricCircles();
		drawBorder();
	};

	function drawParticles() {
		for (let pt of particles) {
			// Static: No position updates

			p.noStroke();
			p.fill(100, 100, 100, pt.alpha);
			p.circle(pt.x, pt.y, pt.size);
		}
	}

	function drawGrid() {
		const STEP = 25;

		// Draw grid lines
		p.stroke(40, 40, 40, 50);
		p.strokeWeight(0.5);
		for (let x = STEP; x < p.width; x += STEP) {
			p.line(x, 0, x, p.height);
		}
		for (let y = STEP; y < p.height; y += STEP) {
			p.line(0, y, p.width, y);
		}

		// Draw points
		p.stroke(40, 40, 40, 120);
		p.strokeWeight(2);
		for (let x = STEP; x < p.width; x += STEP) {
			for (let y = STEP; y < p.height; y += STEP) {
				p.point(x, y);
			}
		}
	}

	function drawFlower() {
		const PETAL_COUNT = 7;

		p.push();
		p.translate(45, 45);
		p.stroke(20, 20, 20, 150);
		p.strokeWeight(0.7);
		for (let i = 0; i < PETAL_COUNT * 2; i++) {
			p.rotate(p.PI / PETAL_COUNT);
			p.line(0, 0, 15, 0);
		}
		p.pop();
	}

	function drawX(x: number, y: number, size: number) {
		p.push();
		p.translate(x, y);
		p.rectMode(p.CENTER);
		p.noStroke();
		p.fill(20, 20, 20, 255);

		const widthMultiplier = 1.9;
		const rectWidth = size * widthMultiplier;
		const rectHeight = 0.7;

		p.push();
		p.rotate(p.QUARTER_PI);
		p.rect(0, 0, rectWidth, rectHeight);
		p.pop();

		p.push();
		p.rotate(-p.QUARTER_PI);
		p.rect(0, 0, rectWidth, rectHeight);
		p.pop();

		p.pop();
	}

	function drawCircleCluster(art: any) {
		const numCircles = art.numCircles;
		const noiseStep = 10;

		for (let i = 0; i < numCircles; i++) {
			const baseNoise = art.shapeOffset + i * noiseStep;

			// Perlin noise + map to position and size
			const maxOffset = art.size / 5;
			const nx = p.noise(baseNoise);
			const offsetX = p.map(nx, 0, 1, -maxOffset, maxOffset);

			const ny = p.noise(baseNoise + 50);
			const offsetY = p.map(ny, 0, 1, -maxOffset, maxOffset);

			const minDiameter = art.size / 2;
			const nd = p.noise(baseNoise + 100);
			const diameter = p.map(nd, 0, 1, minDiameter, art.size);

			// Static color (no frameCount)
			const colorProgress = art.colorIndex % palette.length;
			const currentIndex = p.floor(colorProgress) % palette.length;
			const nextIndex = (currentIndex + 1) % palette.length;

			const lerpAmount = colorProgress % 1;
			const currentColor = p.color(palette[currentIndex]);
			const nextColor = p.color(palette[nextIndex]);
			const interpolatedColor = p.lerpColor(currentColor, nextColor, lerpAmount);

			const dynamicAlpha = p.map(p.noise(art.alphaOffset), 0, 1, 100, 220);

			p.fill(
				p.red(interpolatedColor),
				p.green(interpolatedColor),
				p.blue(interpolatedColor),
				dynamicAlpha
			);

			p.circle(offsetX, offsetY, diameter);
		}
	}

	function drawGeometricCircles() {
		p.push();
		p.translate(p.width / 2, p.height / 2);
		p.noFill();
		p.stroke(30, 30, 30, 255);

		const baseRadius = 95;
		const pulseAmount = 5;
		// Static pulse
		const pulse = 0;
		let radius = baseRadius + pulseAmount * pulse;

		let numCircles = 8;

		// Outer circles
		for (let i = 0; i < numCircles; i++) {
			let angle = p.map(i, 0, numCircles, 0, p.TWO_PI);
			const distanceFromCenter = radius / 2.5;
			let x = p.cos(angle) * distanceFromCenter;
			let y = p.sin(angle) * distanceFromCenter;

			p.strokeWeight(0.6);
			p.circle(x, y, radius);
		}

		// Middle circles
		for (let i = 5; i > 0; i--) {
			p.strokeWeight(0.6);
			p.circle(0, 0, i * 20);
		}

		p.pop();
	}

	function drawBorder() {
		p.push();

		p.rectMode(p.CORNER);

		const outerBorderWidth = 30;
		p.strokeWeight(outerBorderWidth);
		p.stroke(10, 10, 10, 255);
		p.noFill();
		p.rect(0, 0, p.width, p.height);

		const innerMargin = 22;
		p.strokeWeight(1);
		p.stroke(50, 50, 50, 200);
		p.rect(innerMargin, innerMargin, p.width - innerMargin * 2, p.height - innerMargin * 2);

		p.pop();
	}
}
