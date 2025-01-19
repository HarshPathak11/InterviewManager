// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap');

  body {
    margin: 0;
    margin-top:50px;
    font-family: 'Jost', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #eef2f5;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  .grainy-light {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA0LTIxVDE1OjU4OjUxKzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTIxVDE1OjU4OjUxKzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNC0yMVQxNTo1ODo1MSswMjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNDA0ZTNlNi1jMDMxLTljNGYtOTg1NC00ZTUyOTg2ZWMwNzIiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2ZDlmM2FiMS03YzVhLTQxNDUtYjljYy1l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');
}
.grainy-dark {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAIAAADYYG7QAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDUgNzkuMTY0NTkwLCAyMDIwLzEyLzA5LTExOjU3OjQ0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDI0LTA0LTIxVDE2OjAwOjQ1KzAyOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA0LTIxVDE2OjAwOjQ1KzAyOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyNC0wNC0yMVQxNjowMDo0NSswMjowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpiNTU4MWVlNy1mZjFiLTFjNGUtYTMxMy02YjQ0Mzc2MGZjN2YiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpmYTM5Y2U4MS1hZGViLTE5NDgtYjdhYi1i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');
}

`;

export default GlobalStyles;
