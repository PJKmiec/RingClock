<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<div align="center">

  <h3 align="center">Ring Clock - a jQUery widget</h3>

  <p align="center">
    A configurable clock widget
    <br />
    <br />
    <a href="https://sariel.pl/ringclock/">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
  <li>
    <a href="#about">About</a>
  </li>
    <li>
      <a href="#usage">Usage</a>
    </li>
    <li>
      <a href="#configuration">Configuration</a>
    </li>
    <li>
      <a href="#configuration">Notes</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About

The RingClock is a simple SVG-based widget for your website. The idea, inspired by smartwatch faces, is that except for the central watch face the date and time are visualized by circular rings around the face - each with tracking of the current progress and individually configurable color. The clock works in realtime, with continually updated rings progress and watch face.

Pros:
* Ease of use - just add the ID to an element where you want to display the clock
* Flexible configuration - change the color of any ring + ring thickness + watch face CSS attributes
* Minimum configuration required - you can launch the clock without touching configuration, the dimensions will be inherited from the container and default configuration will be used

<p align="right">(<a href="#top">back to top</a>)</p>


## Usage

### Prerequisites

The script requires a container element (e.g. a div) and the jQuery library (at least 1.9.1 version).

### Usage

1. Include style.css in your <head></head>
2. Add "ringclock" ID to the container element on your website; the container's dimensions determine clock's dimensions
3. Include jQuery library after the </body> tag
4. Include the clock JS script after the jQuery library

For example:

```
<body>
  <div id="ringclock" style="width: 350px; height: 350px;"></div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="ringclock.js"></script>
```

<p align="right">(<a href="#top">back to top</a>)</p>


## Configuration

For simplicity, the watch face can be customized using the style.css file while the rings can be customized using the configuration included at the beginning of the ringclock.js file.

The default style.css file looks as follows, where #date is the line displaying day of month, month name and year, #time is the line displaying hours, minutes and seconds, and #day is the line displaying day of the week:

  ```
  #date, #day {text-transform: uppercase;}
  #date {font-size: 10px; fill: #f3a8f3}
  #time {font-size: 24px; fill: #8f4e8f}
  #day {font-size: 12px; fill: #ee82ee}
  ```
_It's important to remember that "fill" values have to be used without quote marks; you can use textual values, hex values or rgba values here_

The default configuration in the ringclock.js file looks as follows:

```
var timeFormat = ['month', 'day', 'hour', 'minute', 'second'];
var strokeWidth = 10;
var ringColors = {month: '#fadafa', day: '#f7c1f7', hour: '#f3a8f3', minute: '#f08ff0', second: '#d675d6', background: '#fdf3fd'};
```
Where:
* **timeFormat** controls which rings are shown and in what order (outermost ring first, innermost ring last)
* **strokeWidth** controls the thickness of every single ring as well as spacing between them
* **ringColors** provide color values for all rings as well as background color which is used for the empty circles that the rings fill

### Examples

The following timeFormat variable will display only three rings: for seconds, minutes and hours, with seconds shown as the outermost ring and hours shown as the innermost ring. The month and day rings will be absent.

```
var timeFormat = ['second', 'minute', 'hour'];
```

The following timeFormat variable will display only two rings: for day and hours, with day shown as the outermost ring and hours shown as the innermost ring. The month, minutes and seconds rings will be absent.

```
var timeFormat = ['day', 'hour'];
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Notes

* the widget has no background of its own and is technically "transparent" except for rings and numbers/letters
* the names of months and days can be translated inside the ringclock.js file
* the container for the widget doesn't need to be square; if used in a vertical rectangle, the widget will be extended to its width and centered vertically; if used in a horizontal rectangle, the widget will be extended to its height and centered horizontally
* by default the clock is refreshed every 500ms; I found that refreshing by a full 1 second can sometimes "hit" the same date.second twice, which makes the progress of the rings appear intermittent
* as the watch face has no fixed dimensions, you can adjust its size with font-size value in the styles.css file; there is a possibility that at small widget size the face will overlap the rings, in which case the it will be displayed on top of them

<p align="right">(<a href="#top">back to top</a>)</p>
