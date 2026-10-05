---
title: "SIFT Algorithm"
number: 17
date: 2026-10-05
tag: notes
minutes: 3
---

These notes trace out the core pipeline of the SIFT algorithm, beginning with image smoothing through Gaussian blurs, the structure of scale space across octaves, and the Difference of Gaussians approximation for detecting blobs. From there, I walk through keypoint localization via 26-neighbor extrema checks, alongside the Hessian-based curvature ratio used to reject unstable edge responses. Finally, the entry outlines how keypoints achieve rotation invariance through local gradient magnitudes and orientation histograms, wrapping up with the layout for building the 128-dimensional feature descriptor.

<div class="entry-tabs" data-entry-tabs>
<button type="button" class="entry-tab is-on" data-pane="words">transcription</button>
<button type="button" class="entry-tab" data-pane="pages">the pages</button>
</div>

<section class="entry-pane" data-pane="words" markdown="1">

# SIFT Algorithm

## Convolutions: <span class="guess">Smoothing of images</span>

<span class="guess">filter</span>
Gaussian blur

$$2\text{D gaussian blur} : \frac{1}{2\pi \sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}$$

$$G(x,y,\sigma) = \frac{1}{2\pi \sigma^2} e^{-\frac{x^2+y^2}{2\sigma^2}}$$
weight kernel Feature Map

Convolutions: <span class="guess">by local weighted avg</span>
$$L(x,y,\sigma) = G(x,y,\sigma) * I(x,y)$$
Blurred image at scale $\sigma$
Scale $\sigma \to$ fine details
Large $\to$ only big structure remain

Gaussian $\to$ <span class="guess">why</span> $\to$ spec props:
1. Smooth Continuous
2. <span class="guess">Scale space</span> $\to$ <span class="guess">no artifacts</span>
3. Separable:
$$G(x,y) = G(x) \cdot G(y)$$

Laplacian $\to$ blobs

## Scale space: Coin on table
$$L(x,y,\sigma_1), L(x,y,\sigma_2), L(x,y,\sigma_3) \dots$$
$\sigma_2 = k\sigma_1$
$k = \sqrt{2}$ <span class="guess">scale of image more blurred than prev</span>
<span class="guess">Size of image + blur</span>

Close $\to$ lot of edge
Similar <span class="guess">otherwise</span>

Octaves: <span class="guess">doubling of scale</span>
After some <span class="guess">blurs</span>:
- we downsample the image by 2
- start again

$\to$ <span class="guess guess--lost">[unreadable]</span>
$\to$ smooth transition
Same code <span class="guess">setup</span>
<span class="guess">Overlaps (starts and end points)</span>

<span class="guess">See same object at different sizes</span>
We <span class="guess">achieve scale invariance</span>

Convolution <span class="guess guess--lost">[unreadable]</span>
<span class="guess guess--lost">[unreadable]</span>
<span class="guess guess--lost">[unreadable]</span>
<span class="guess guess--lost">[unreadable]</span>
(<span class="guess">Convolve</span> $G * I$)

## Difference of Gaussians (DoG)
<span class="guess">Does approximation of Laplacian</span> of Gaussian
$$L(x,y,\sigma)$$
$$D(x,y,\sigma) = L(x,y,k\sigma) - L(x,y,\sigma)$$
$\to$ highlight the difference

$\to$ any <span class="guess">major</span> change <span class="guess">pops out</span> (blobs, <span class="guess">corners interest</span>)
$\to$ flat regions negate

---

## Keypoint Detection: Find Extrema in Scale Space

A point a local maximum or minimum

Compare 26 neighbours:
- 8 in same image
- 9 in scale above
- 9 in scale below

Condition:
$D(x,y,\sigma) > \text{all neighbours}$
$D(x,y,\sigma) < \text{all neighbours}$

### Keypoint Localization:
$|D(x,y,\sigma)| < \text{threshold}$
threshold $= 0.03$ (typical)

### Remove Edge Response
We want corners / blobs, not edges

Hessian Matrix:
$$H = \begin{bmatrix} D_{xx} & D_{xy} \\ D_{xy} & D_{yy} \end{bmatrix}$$
<span class="guess">here</span> $D_{xy} = D_{yx}$
$D_{xx} \to$ curvature in $x$ direction
$D_{yy} \to$ curvature in $y$ direction
$D_{xy} \to$ <span class="guess">cross-derivative</span>

So eigenvalues: $\lambda_1, \lambda_2$
Instead of eigenvalues, SIFT uses:
Eigenvalues: $\lambda_1, \lambda_2$

<span class="guess">Remember</span> $\to$ curvature along principal axes
Flat region: $\lambda_1 \approx 0, \lambda_2 \approx 0$
Edge: $\lambda_1 \gg 0, \lambda_2 \approx 0$
Corner / blob: $\lambda_1 \gg 0, \lambda_2 \gg 0 \to$ strong corner

If this is large $\to$ it's an edge $\to$ reject
<span class="guess guess--lost">[unreadable]</span>

$$\operatorname{Tr}(H) = \lambda_1 + \lambda_2$$
$$\operatorname{Det}(H) = \lambda_1 \lambda_2$$
TIME Consuming
For <span class="guess">Each Pixel</span>

$$\frac{(\operatorname{Tr}(H))^2}{\operatorname{Det}(H)} = \frac{(\lambda_1 + \lambda_2)^2}{\lambda_1 \lambda_2} = \frac{(r+1)^2}{r}$$
<span class="guess">Check if $\frac{\operatorname{Tr}(H)^2}{\operatorname{Det}(H)} < \frac{(r+1)^2}{r}$</span>
<span class="guess guess--lost">[unreadable]</span>

---

## Orientation Assignment
Imagine: detect a corner, rotate by $90^\circ$
$\to$ same point, but gradients change direction.

$\to$ <span class="guess">Assign</span> a dominant orientation to each keypoint

### Compute Image Gradients
$$G_x = L(x+1,y) - L(x-1,y)$$
$$G_y = L(x,y+1) - L(x,y-1)$$

$$\text{Magnitude}: m = \sqrt{G_x^2 + G_y^2}$$
$$\text{Orientation}: \theta = \tan^{-1}(G_y / G_x)$$

$\to$ Local neighbourhood around keypoint
take a window around the keypoint: $16 \times 16$
closer weight more $\to$ Gaussian

### Orientation Histogram
Build a histogram of gradient directions

<span class="guess guess--lost">[unreadable]</span>
hist

36 bins, each bin $10^\circ$, range: $0^\circ$ to $360^\circ$

<span class="guess guess--lost">[unreadable]</span>

## Descriptor: (128D Vector)
$16 \times 16$ region (around keypoint)
$4 \times 4 \times 8 = 128 \to$ total features

</section>

<section class="entry-pane" data-pane="pages" markdown="1" hidden>

![Handwritten notes, page 1](/assets/notes/sift-algorithm/page-1.webp){: .note-page loading="lazy"}

![Handwritten notes, page 2](/assets/notes/sift-algorithm/page-2.webp){: .note-page loading="lazy"}

![Handwritten notes, page 3](/assets/notes/sift-algorithm/page-3.webp){: .note-page loading="lazy"}

[source pdf](/assets/notes/sift-algorithm/source.pdf)

</section>
