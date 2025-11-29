import p5 from 'p5';

export function sketch(p: p5) {
	let img: p5.Image;
	const tileSize = 8;

	p.setup = async () => {
		p.createCanvas(600, 400);
		p.noLoop();

		p.loadImage('/profile.jpeg', (image) => {
			if (!image) return;

			renderPortrait(image);
		});
	};

	function renderPortrait(sourceImg: p5.Image) {
		p.background(255);

		const canvasWidth = p.width;
		const canvasHeight = p.height;
		const imgRatio = sourceImg.width / sourceImg.height;
		const canvasRatio = canvasWidth / canvasHeight;

		let drawWidth, drawHeight, dx, dy;

		// format image
		if (imgRatio > canvasRatio) {
			drawWidth = canvasWidth;
			drawHeight = drawWidth / imgRatio;
			dx = 0;
			dy = (canvasHeight - drawHeight) / 2;
		} else {
			drawHeight = canvasHeight;
			drawWidth = drawHeight * imgRatio;
			dx = (canvasWidth - drawWidth) / 2;
			dy = 0;
		}

		for (let y = 0; y < drawHeight; y += tileSize) {
			for (let x = 0; x < drawWidth; x += tileSize) {
				const sourceX = p.floor(p.map(x, 0, drawWidth, 0, sourceImg.width));
				const sourceY = p.floor(p.map(y, 0, drawHeight, 0, sourceImg.height));

				const pixelColor = sourceImg.get(sourceX, sourceY);
				const brightness = (p.red(pixelColor) + p.green(pixelColor) + p.blue(pixelColor)) / 3;
				const shapeSize = p.map(brightness, 0, 255, tileSize * 1.5, tileSize * 0.2);

				p.push();

				p.translate(x + dx + tileSize / 2, y + dy + tileSize / 2);

				if (brightness < 60) {
					p.fill(pixelColor);
					p.noStroke();
					p.rectMode(p.CENTER);
					p.rect(0, 0, shapeSize, shapeSize);
				} else if (brightness < 100) {
					p.fill(pixelColor);
					p.noStroke();
					p.triangle(
						0,
						-shapeSize / 2.5,
						-shapeSize / 2.5,
						shapeSize / 2.5,
						shapeSize / 2.5,
						shapeSize / 2.5
					);
				} else if (brightness < 160) {
					p.stroke(pixelColor);
					p.strokeWeight(2);
					p.line(-shapeSize / 2, 0, shapeSize / 2, 0);
					p.line(0, -shapeSize / 2, 0, shapeSize / 2);
				} else if (brightness < 220) {
					p.noFill();
					p.stroke(pixelColor);
					p.strokeWeight(2);
					let startAngle = p.random(p.TWO_PI);
					let endAngle = startAngle + p.PI * 0.75;
					p.arc(0, 0, shapeSize, shapeSize, startAngle, endAngle);
				} else {
					p.fill(pixelColor);
					p.noStroke();
					p.ellipse(0, 0, shapeSize * 0.5, shapeSize * 0.5);
				}

				p.pop();
			}
		}

		drawBorder();
		drawFlower();

		drawX(p.width - 45, 45, 14);
		drawX(p.width - 75, 45, 12);
		drawX(p.width - 105, 45, 10);

		addNoise();
	}

	function drawBorder() {
		p.push();
		p.rectMode(p.CORNER);
		p.strokeWeight(30);
		p.stroke(10, 10, 10);
		p.noFill();
		p.rect(0, 0, p.width, p.height);

		p.strokeWeight(1);
		p.stroke(50);
		p.rect(22, 22, p.width - 44, p.height - 44);
		p.pop();

		p.stroke(160);
		p.strokeWeight(2);
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

	function addNoise() {
		p.loadPixels();

		for (let i = 0; i < p.pixels.length; i += 4) {
			let noiseAmount = p.random(-15, 15);
			p.pixels[i] = p.constrain(p.pixels[i] + noiseAmount, 0, 255);
			p.pixels[i + 1] = p.constrain(p.pixels[i + 1] + noiseAmount, 0, 255);
			p.pixels[i + 2] = p.constrain(p.pixels[i + 2] + noiseAmount, 0, 255);
		}

		p.updatePixels();
	}
}
