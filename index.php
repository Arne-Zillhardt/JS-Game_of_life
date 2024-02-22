<!DOCTYPE html>
<head>
<script src="script.js"></script>
<link  rel="stylesheet" href="style.css">
</head>

<body onload="start()">
<h1 class="project-headline">Game Of Life</h1>
    <p class="project-paragraph">Conways game of life</p>
    <table class="gol-table">
        <?php
            for($i = 0; $i <= 35; $i++){
                echo "<tr>";
                for($j = 0; $j <= 50; $j++){
                    echo "<td id=\"". $j ."_". $i ."\" class=\"cell\" onmousedown=\"cellSpawn($j, $i)\"></td>";
                }
                echo "</tr>";
            }
        ?>
    </table>

    <button class="reset-button" onclick="initBoard()">RESET</button>
</body>