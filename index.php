<!DOCTYPE html>
<head>
<script src="script.js"></script>
<link  rel="stylesheet" href="style.css">
</head>

<body onload="init()">
<h1 class="project-headline">Game Of Life</h1>
    <p class="project-paragraph">Conways game of life</p>
    <table class="gol-table">
        <?php
            for($i = 0; $i <= 50; $i++){
                echo "<tr>";
                for($j = 0; $j <= 160; $j++){
                    echo "<td id=\"". $j ."_". $i ."\" class=\"cell\" onmouseenter=\"hoverInCell($j, $i)\" onmouseleave=\"hoverOutCell($j, $i)\" onmousedown=\"cellSpawn($j, $i)\"></td>";
                }
                echo "</tr>";
            }
        ?>
    </table>

    <div class="buttons">
    <button class="reset-button" id="start-button" onclick="start()">Start</button>
    <button class="reset-button" onclick="reset()">RESET</button>
    </div>
</body>