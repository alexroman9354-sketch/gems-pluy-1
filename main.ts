namespace SpriteKind {
    export const PlayerHit = SpriteKind.create()
    export const EnemyHit = SpriteKind.create()
    export const Energy = SpriteKind.create()
    export const EnemyProjectile = SpriteKind.create()
    export const ChargeEffect = SpriteKind.create()
}

let player: Sprite = null
let enemy: Sprite = null
let preview: Sprite = null
let chargeEffect: Sprite = null

let gameStarted = false
let menuStage = 1
let selected = 0

let armorColor = 1
let hairColor = 9
let facing = 1

let playerHP = 100
let enemyHP = 100
let enemyMaxHP = 100

let enemyDamage = 8
let enemySpeed = 22
let enemyAttackDelay = 1000

let currentLevel = 1

let attackCooldown = 0
let specialCooldown = 0
let enemyCooldown = 0
let enemyInvulnerable = 0

let enemyAlive = false
let levelChanging = false

let charging = false
let chargeTime = 0
let chargeMax = 900
let chargedAttackReady = false

let hero = img`
    . f f f . f f f f . f f f .
    f f f f f c c c c f f f f f
    f f f f b c c c c b f f f f
    f f f c 3 c c c c 3 c f f f
    . f 3 3 c c c c c c 3 3 f .
    . f c c c c 4 4 c c c c f .
    . f f c c 4 4 4 4 c c f f .
    . f f f b f 4 4 f b f f f .
    . f f 4 1 f d d f 1 4 f f .
    . . f f d d d d d d f f . .
    . . e f e 4 4 4 4 e f e . .
    . e 4 f b 3 3 3 3 b f 4 e .
    . 4 d f 3 3 3 3 3 3 c d 4 .
    . 4 4 f 6 6 6 6 6 6 f 4 4 .
    . . . . f f f f f f . . . .
    . . . . f f . . f f . . . .
`

let heroAttack = img`
    . . . . . . . . . . . . . .
    . f f f . f f f f . f f f .
    f f f f f c c c c f f f f f
    f f f f b c c c c b f f f f
    f f f c 3 c c c c 3 c f f f
    . f 3 3 c c c c c c 3 3 f .
    . f c c c c 4 4 c c c c f .
    . f f c c 4 4 4 4 c c f f .
    . f f f b f 4 4 f b f f f .
    . f f 4 1 f d d f 1 4 f f .
    . e f e 4 d d d d d f f . .
    . e 4 d d e b b b f f e f .
    . . e d d e 3 3 b e f 4 e .
    . . . e e f 6 6 6 6 f . . .
    . . . . f f f f f f f . . .
    . . . . . . . . f f f . . .
`

let enemy1 = img`
    ........................
    ........................
    .......ff...............
    .....ff22ff.............
    ...fff2222fff...........
    ..fff222222fff..........
    ..fff222222fff..........
    ..feeeeeeeeeeff.........
    .ffe22222222eff.........
    .fffffeeeefffff.........
    fdfefbf44fbfeff.........
    fbfe41fddf14ef..........
    fbffe4dddd4efe..........
    fcfef22222f4e...........
    .ff4f44554f4e...........
    ....ffffffdde...........
    .....ffffedde...........
    ..........ee............
    .........ccc............
    ........cc1cc...........
    .........c1c............
    .........c1c............
    .........c1c............
    .........c1c............
`

let enemy2 = img`
    . . . . . . 5 . 5 . . . . . . .
    . . . . . f 5 5 5 f f . . . . .
    . . . . f 1 5 2 5 1 6 f . . . .
    . . . f 1 6 6 6 6 6 1 6 f . . .
    . . . f 6 6 f f f f 6 1 f . . .
    . . . f 6 f f d d f f 6 f . . .
    . . f 6 f d f d d f d f 6 f . .
    . . f 6 f d 3 d d 3 d f 6 f . .
    . . f 6 6 f d d d d f 6 6 f . .
    . f 6 6 f 3 f f f f 3 f 6 6 f .
    . . f f d 3 5 3 3 5 3 d f f . .
    . . f d d f 3 5 5 3 f d d f . .
    . . . f f 3 3 3 3 3 3 f f . . .
    . . . f 3 3 5 3 3 5 3 3 f . . .
    . . . f f f f f f f f f f . . .
    . . . . . f f . . f f . . . . .
`

let enemy3 = img`
    . . . . f f f f f . . . . . . .
    . . . f e e e e e f . . . . . .
    . . f d d d d e e e f . . . . .
    . c d f d d f d e e f f . . . .
    . c d f d d f d e e d d f . . .
    c d e e d d d d e e b d c . . .
    c d d d d c d d e e b d c . . .
    c c c c c d d e e e f c . . . .
    . f d d d d e e e f f . . . . .
    . . f e e e f f e e e f . . . .
    . . f f f f f e e e e e f . f f
    . . f d b f e e f f e e f . e f
    . f f d d f e f f e e e f . e f
    . f f f f f f e b b f e f f e f
    . f d d f e e e d d b e f f f f
    . . f f f f f f f f f f f f f .
`

let bossImage = img`
    ..............ccccccccc........
    ............cc555555555cc......
    ...........c5555555555555c.....
    ..........c55555555555555dc....
    .........c555555555555b5bdc....
    .........555bc1555555555bdcccc.
    ........c555ccc55555555bbdccddc
    ........c555bcb5555555ccddcdddc
    .......c555555555551ccccddbdddc
    .......c555555b555c1cccbddbbdbc
    .......c5555555bbc33333ddddbcc.
    .......c555555555bc333555ddbc..
    .......c5555555555555555555c...
    .......cd555555555555cccc555c..
    .......cd55555555555c555c555c..
    .......cdd555555555b5555b555c..
    .......cddd55555ddbb555bb555c..
    .......cdddd55555555555b5555c..
    .......cddddd5555555ddb5555dc..
    c......cdddddd555555555555dcc..
    cc...ccddddddd555555555555dc...
    cdccccdddddd555555d55555ddcc...
    cdddddddddbd5555555ddddddccccc.
    ccdddddddbb55555555bddddccbddc.
    .ccddddddbd55555555bdddccdddc..
    ..cccddddbd5555555cddcccddbc...
    ....ccccccd555555bcccc.cccc....
    .........cc555555bc............
    .........cc55555555c...........
    ..........cccccccccc...........
`

let background = image.create(160, 120)

function setArenaBackground(level: number) {
    background.fill(1)

    if (level == 1) {
        background.fillRect(0, 0, 160, 70, 13)
    } else if (level == 2) {
        background.fillRect(0, 0, 160, 70, 9)
    } else if (level == 3) {
        background.fillRect(0, 0, 160, 70, 12)
    } else {
        background.fillRect(0, 0, 160, 70, 2)
    }

    background.fillRect(0, 70, 160, 50, 6)
    background.fillCircle(128, 24, 12, 15)

    background.fillRect(0, 74, 24, 34, 2)
    background.fillRect(28, 61, 22, 47, 2)
    background.fillRect(54, 76, 25, 32, 2)
    background.fillRect(83, 64, 20, 44, 2)
    background.fillRect(108, 74, 25, 34, 2)
    background.fillRect(138, 58, 22, 50, 2)

    scene.setBackgroundImage(background)
}

function getHeroImage(attack: boolean): Image {
    let result: Image = null

    if (attack) {
        result = heroAttack.clone()
    } else {
        result = hero.clone()
    }

    result.replace(6, armorColor)
    result.replace(7, armorColor)
    result.replace(9, hairColor)

    if (facing == -1) {
        result.flipX()
    }

    return result
}

function updateCostumePreview() {
    let picture = hero.clone()

    if (selected == 0) {
        armorColor = 1
    } else if (selected == 1) {
        armorColor = 5
    } else {
        armorColor = 7
    }

    picture.replace(6, armorColor)
    picture.replace(7, armorColor)
    picture.replace(9, hairColor)

    preview.setImage(picture)
}

function updateHairPreview() {
    let picture = hero.clone()

    picture.replace(6, armorColor)
    picture.replace(7, armorColor)

    if (selected == 0) {
        hairColor = 1
    } else if (selected == 1) {
        hairColor = 2
    } else {
        hairColor = 7
    }

    picture.replace(9, hairColor)
    preview.setImage(picture)
}

function startLevel(level: number) {
    currentLevel = level
    levelChanging = false
    enemyAlive = false
    enemyCooldown = 0
    enemyInvulnerable = 0

    if (enemy != null) {
        enemy.destroy()
    }

    if (level == 1) {
        enemyMaxHP = 140
        enemyDamage = 8
        enemySpeed = 22
        enemyAttackDelay = 1000

        enemy = sprites.create(
            enemy1,
            SpriteKind.Enemy
        )

        game.splash(
            "LEVEL 1",
            "First fighter"
        )

    } else if (level == 2) {
        enemyMaxHP = 200
        enemyDamage = 11
        enemySpeed = 30
        enemyAttackDelay = 820

        enemy = sprites.create(
            enemy2,
            SpriteKind.Enemy
        )

        game.splash(
            "LEVEL 2",
            "Stronger enemy"
        )

    } else if (level == 3) {
        enemyMaxHP = 280
        enemyDamage = 14
        enemySpeed = 36
        enemyAttackDelay = 680

        enemy = sprites.create(
            enemy3,
            SpriteKind.Enemy
        )

        game.splash(
            "LEVEL 3",
            "Elite fighter"
        )

    } else {
        enemyMaxHP = 500
        enemyDamage = 20
        enemySpeed = 42
        enemyAttackDelay = 520

        enemy = sprites.create(
            bossImage,
            SpriteKind.Enemy
        )

        game.splash(
            "BOSS",
            "FINAL BATTLE"
        )
    }

    enemyHP = enemyMaxHP
    enemyAlive = true

    enemy.setPosition(118, 92)
    enemy.setStayInScreen(true)
    enemy.ay = 300

    setArenaBackground(level)
}

function damageEnemy(amount: number) {
    if (!gameStarted || !enemyAlive || enemy == null) {
        return
    }

    if (enemyInvulnerable > 0) {
        return
    }

    enemyInvulnerable = 120
    enemyHP -= amount
    enemy.vx = facing * 45

    if (enemyHP <= 0) {
        enemyHP = 0
        defeatEnemy()
    }
}

function defeatEnemy() {
    if (!enemyAlive || levelChanging) {
        return
    }

    enemyAlive = false
    levelChanging = true
    enemyHP = 0

    if (enemy != null) {
        enemy.destroy()
    }

    if (currentLevel < 4) {
        playerHP += 25

        if (playerHP > 100) {
            playerHP = 100
        }

        pause(600)
        startLevel(currentLevel + 1)

    } else {
        pause(600)
        finishBoss()
    }
}

function finishBoss() {
    let wishes = [
        "Желаю удачи во всех твоих делах!",
        "Желаю побольше радостных дней!",
        "Желаю добиться своих целей!",
        "Желаю верных друзей рядом!",
        "Желаю успехов в учёбе!",
        "Желаю крутых побед!",
        "Желаю много хороших моментов!",
        "Желаю отличного настроения!",
        "Желаю новых побед!",
        "Желаю, чтобы всё получилось!"
    ]

    let wish = wishes[
        randint(0, wishes.length - 1)
    ]

    game.showLongText(
        "ТЫ ПОБЕДИЛ БОССА!\n\nПожелание:\n\n" + wish,
        DialogLayout.Center
    )

    game.gameOver(true)
}

function createEnemyOrb() {
    if (!enemyAlive || enemy == null) {
        return
    }

    let orb = sprites.create(
        img`
            . . . . . . . . . . . 6 6 6 6 6
            . . . . . . . . . 6 6 7 7 7 7 8
            . . . . . . 8 8 8 7 7 8 8 6 8 8
            . . e e e e c 6 6 8 8 . 8 7 8 .
            . e 2 5 4 2 e c 8 . . . 6 7 8 .
            e 2 4 2 2 2 2 2 c . . . 6 7 8 .
            e 2 2 2 2 2 2 2 c . . . 8 6 8 .
            e 2 e e 2 2 2 2 e e e e c 6 8 .
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
            . c 2 e e e 2 e 2 4 2 2 2 2 c .
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e
            . . . e c c e c 2 2 2 2 2 2 2 e
            . . . . . . . c 2 e e 2 2 e 2 c
            . . . . . . . c e e e e e e 2 c
            . . . . . . . . c e 2 2 2 2 c .
            . . . . . . . . . c c c c c . .
        `,
        SpriteKind.EnemyProjectile
    )

    let direction = 1

    if (enemy.x > player.x) {
        direction = -1
    }

    orb.setPosition(
        enemy.x + direction * 17,
        enemy.y
    )

    orb.vx = direction * 80
    orb.lifespan = 1800
}

function createEnemyWave() {
    if (!enemyAlive || enemy == null) {
        return
    }

    let wave = sprites.create(
        img`
            . . . . . . . e c 7 . . . . . .
            . . . . e e e c 7 7 e e . . . .
            . . c e e e e c 7 e 2 2 e e . .
            . c e e e e e c 6 e e 2 2 2 e .
            . c e e e 2 e c c 2 4 5 4 2 e .
            c e e e 2 2 2 2 2 2 4 5 5 2 2 e
            c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
            c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
            . e e e 2 2 2 2 2 2 2 2 2 4 e .
            . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
            . . 2 e e 2 2 2 2 2 4 4 2 e . .
            . . . 2 2 e e 4 4 4 2 e e . . .
            . . . . . 2 2 e e e e . . . . .
        `,
        SpriteKind.EnemyProjectile
    )

    let direction = 1

    if (enemy.x > player.x) {
        direction = -1
    }

    wave.setPosition(
        enemy.x + direction * 18,
        enemy.y + 3
    )

    wave.vx = direction * 100
    wave.lifespan = 1400
}

function enemyAttack() {
    if (!gameStarted || !enemyAlive || enemy == null) {
        return
    }

    if (enemyCooldown > 0) {
        return
    }

    if (Math.abs(enemy.x - player.x) > 52) {
        return
    }

    enemyCooldown = enemyAttackDelay

    let attackType = randint(0, 1)

    if (currentLevel == 4) {
        attackType = randint(0, 2)
    }

    if (attackType == 0) {

        let direction = 1

        if (enemy.x > player.x) {
            direction = -1
        }

        let hit = sprites.create(
            image.create(28, 18),
            SpriteKind.EnemyHit
        )

        hit.setFlag(
            SpriteFlag.Invisible,
            true
        )

        hit.setPosition(
            enemy.x + direction * 18,
            enemy.y
        )

        hit.lifespan = 130

    } else if (attackType == 1) {

        createEnemyOrb()

    } else {

        createEnemyWave()
    }
}

function startGame() {
    gameStarted = true

    preview.destroy()

    player = sprites.create(
        getHeroImage(false),
        SpriteKind.Player
    )

    player.setPosition(42, 92)
    player.setStayInScreen(true)
    player.ay = 300

    controller.moveSprite(
        player,
        65,
        0
    )

    playerHP = 100

    startLevel(1)
}

// ==================================================
// ДВИЖЕНИЕ
// ==================================================

controller.left.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        if (!gameStarted) {

            selected -= 1

            if (selected < 0) {
                selected = 2
            }

            if (menuStage == 1) {
                updateCostumePreview()
            } else {
                updateHairPreview()
            }

            return
        }

        facing = -1
        player.setImage(
            getHeroImage(false)
        )
    }
)

controller.right.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        if (!gameStarted) {

            selected += 1

            if (selected > 2) {
                selected = 0
            }

            if (menuStage == 1) {
                updateCostumePreview()
            } else {
                updateHairPreview()
            }

            return
        }

        facing = 1
        player.setImage(
            getHeroImage(false)
        )
    }
)

// ==================================================
// A — НАЖАТИЕ / ЗАРЯД
// ==================================================

controller.A.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        if (!gameStarted) {

            if (menuStage == 1) {

                menuStage = 2
                selected = 0

                updateHairPreview()

            } else {

                startGame()
            }

            return
        }

        if (attackCooldown > 0 || charging) {
            return
        }

        charging = true
        chargeTime = 0
        chargedAttackReady = false

        chargeEffect = sprites.create(
            img`
                ....................
                ....................
                ...............9.9..
                ..............99999.
                ..9.9..........999..
                .99999..........9...
                .99999..............
                ..999...............
                ...9................
                ....................
                ....................
                .........9....9.....
                ........999..999....
                .......9999999999...
                .......9999999999...
                ........99999999....
                .........999999.....
                ..........9999......
                ...........99.......
                ....................
            `,
            SpriteKind.ChargeEffect
        )

        chargeEffect.setFlag(
            SpriteFlag.Ghost,
            true
        )

        chargeEffect.setPosition(
            player.x,
            player.y - 8
        )
    }
)

// ==================================================
// A — ОТПУСКАНИЕ
// ==================================================

controller.A.onEvent(
    ControllerButtonEvent.Released,
    function () {

        if (!gameStarted || !charging) {
            return
        }

        charging = false

        if (chargeEffect != null) {
            chargeEffect.destroy()
            chargeEffect = null
        }

        // ------------------------------------------
        // ОБЫЧНЫЙ УДАР
        // ------------------------------------------

        if (chargeTime < 300) {

            attackCooldown = 320

            player.setImage(
                getHeroImage(true)
            )

            if (
                enemyAlive &&
                enemy != null &&
                Math.abs(player.x - enemy.x) < 30 &&
                Math.abs(player.y - enemy.y) < 25
            ) {

                damageEnemy(50)
            }

            pause(90)

            player.setImage(
                getHeroImage(false)
            )

            return
        }

        // ------------------------------------------
        // ЗАРЯЖЕННАЯ ЭНЕРГИЯ ГЛАЗА
        // ------------------------------------------

        attackCooldown = 650
        specialCooldown = 650
        chargedAttackReady = true

        let direction = facing

        let projectile = sprites.create(
            img`
                ....................
                ....................
                ....................
                ....2222...2222.....
                ...222222.222222....
                ..222222222222222...
                ..222222222222222...
                ..222222222222222...
                ..222222222222222...
                ..222222222222222...
                ..222222222222222...
                ...2222222222222....
                ....22222222222.....
                .....222222222......
                ......2222222.......
                .......22222........
                ........222.........
                .........2..........
                .........2..........
                ....................
            `,
            SpriteKind.Energy
        )

        projectile.setPosition(
            player.x + direction * 18,
            player.y - 3
        )

        projectile.vx = direction * 120
        projectile.lifespan = 1200

        player.setImage(
            getHeroImage(true)
        )

        pause(100)

        player.setImage(
            getHeroImage(false)
        )
    }
)

// ==================================================
// B — ЭНЕРГИЯ
// ==================================================

controller.B.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        if (!gameStarted) {

            if (menuStage == 2) {

                menuStage = 1
                selected = 0

                updateCostumePreview()
            }

            return
        }

        if (specialCooldown > 0 || charging) {
            return
        }

        specialCooldown = 900

        let projectile = sprites.create(
            img`
                . . 4 4 4 4 . .
                . 4 5 5 5 5 4 .
                4 5 3 5 5 3 5 4
                4 5 5 5 5 5 5 4
                . 4 5 3 3 5 4 .
                . . 4 4 4 4 . .
            `,
            SpriteKind.Energy
        )

        projectile.setPosition(
            player.x + facing * 15,
            player.y
        )

        projectile.vx = facing * 110
        projectile.lifespan = 1100
    }
)

// ==================================================
// ПРЫЖОК
// ==================================================

controller.up.onEvent(
    ControllerButtonEvent.Pressed,
    function () {

        if (!gameStarted || charging) {
            return
        }

        if (player.bottom >= 108) {
            player.vy = -120
        }
    }
)

// ==================================================
// ПОПАДАНИЕ ЭНЕРГИИ ИГРОКА
// ==================================================

sprites.onOverlap(
    SpriteKind.Energy,
    SpriteKind.Enemy,
    function (projectile, target) {

        projectile.destroy()

        if (chargedAttackReady) {

            damageEnemy(32)

            chargedAttackReady = false

        } else {

            damageEnemy(100)
        }
    }
)

// ==================================================
// ПОПАДАНИЕ СНАРЯДА ВРАГА
// ==================================================

sprites.onOverlap(
    SpriteKind.EnemyProjectile,
    SpriteKind.Player,
    function (projectile, target) {

        projectile.destroy()

        if (!gameStarted || playerHP <= 0) {
            return
        }

        if (currentLevel == 4) {

            playerHP -= 14

        } else {

            playerHP -= 10
        }

        player.vx = -20

        if (playerHP <= 0) {

            playerHP = 0

            game.gameOver(false)
        }
    }
)

// ==================================================
// ПОПАДАНИЕ ОБЫЧНОЙ АТАКИ ВРАГА
// ==================================================

sprites.onOverlap(
    SpriteKind.EnemyHit,
    SpriteKind.Player,
    function (hit, target) {

        hit.destroy()

        if (!gameStarted || playerHP <= 0) {
            return
        }

        playerHP -= enemyDamage
        player.vx = -25

        if (playerHP <= 0) {

            playerHP = 0

            game.gameOver(false)
        }
    }
)

// ==================================================
// ИИ
// ==================================================

game.onUpdateInterval(
    100,
    function () {

        if (!gameStarted) {
            return
        }

        if (!enemyAlive || enemy == null) {
            return
        }

        if (enemyHP <= 0) {
            return
        }

        if (enemy.x < player.x - 22) {

            enemy.vx = enemySpeed

        } else if (enemy.x > player.x + 22) {

            enemy.vx = -enemySpeed

        } else {

            enemy.vx = 0
        }
    }
)

// ==================================================
// АТАКА ВРАГА
// ==================================================

game.onUpdateInterval(
    100,
    function () {

        enemyAttack()
    }
)

// ==================================================
// ИГРОВОЙ ЦИКЛ
// ==================================================

game.onUpdate(
    function () {

        if (!gameStarted) {
            return
        }

        if (player.bottom > 108) {

            player.bottom = 108
            player.vy = 0
        }

        if (enemy != null) {

            if (enemy.bottom > 108) {

                enemy.bottom = 108
                enemy.vy = 0
            }
        }

        if (attackCooldown > 0) {
            attackCooldown -= 16
        }

        if (specialCooldown > 0) {
            specialCooldown -= 16
        }

        if (enemyCooldown > 0) {
            enemyCooldown -= 16
        }

        if (enemyInvulnerable > 0) {
            enemyInvulnerable -= 16
        }

        // ------------------------------------------
        // ЗАРЯДКА A
        // ------------------------------------------

        if (charging) {

            chargeTime += 16

            if (chargeTime > chargeMax) {
                chargeTime = chargeMax
            }

            if (chargeTime >= 300) {
                chargedAttackReady = true
            }

            if (chargeEffect != null) {

                chargeEffect.setPosition(
                    player.x,
                    player.y - 8
                )
            }
        }
    }
)

// ==================================================
// ЭКРАН
// ==================================================

game.onPaint(
    function () {

        if (!gameStarted) {

            screen.fill(1)

            screen.printCenter(
                "SOZDAT BOYCA",
                5,
                15
            )

            if (menuStage == 1) {

                screen.printCenter(
                    "< KOSTYUM >",
                    22,
                    14
                )

                screen.print(
                    "BLACK",
                    7,
                    84,
                    15
                )

                screen.print(
                    "BLUE",
                    62,
                    84,
                    15
                )

                screen.print(
                    "WHITE",
                    110,
                    84,
                    15
                )

            } else {

                screen.printCenter(
                    "< VOLOSY >",
                    22,
                    14
                )

                screen.print(
                    "BLACK",
                    7,
                    84,
                    15
                )

                screen.print(
                    "RED",
                    67,
                    84,
                    15
                )

                screen.print(
                    "LIGHT",
                    110,
                    84,
                    15
                )
            }

            if (selected == 0) {

                screen.print(
                    "^",
                    28,
                    95,
                    4
                )

            } else if (selected == 1) {

                screen.print(
                    "^",
                    76,
                    95,
                    4
                )

            } else {

                screen.print(
                    "^",
                    128,
                    95,
                    4
                )
            }

            screen.printCenter(
                "A - CHOOSE",
                107,
                15
            )

            screen.printCenter(
                "B - BACK",
                114,
                15
            )

            return
        }

        // ------------------------------------------
        // HUD
        // ------------------------------------------

        screen.print(
            "LVL " + currentLevel,
            67,
            2,
            15
        )

        screen.print(
            "YOU",
            5,
            10,
            15
        )

        if (currentLevel == 4) {

            screen.print(
                "BOSS",
                116,
                10,
                15
            )

        } else {

            screen.print(
                "ENEMY",
                111,
                10,
                15
            )
        }

        screen.fillRect(
            5,
            18,
            55,
            5,
            2
        )

        if (playerHP > 0) {

            screen.fillRect(
                5,
                18,
                playerHP * 55 / 100,
                5,
                4
            )
        }

        screen.fillRect(
            100,
            18,
            55,
            5,
            2
        )

        if (enemyHP > 0) {

            screen.fillRect(
                100,
                18,
                enemyHP * 55 / enemyMaxHP,
                5,
                5
            )
        }

        // ------------------------------------------
        // ПОЛОСКА ЗАРЯДА
        // ------------------------------------------

        if (charging) {

            screen.print(
                "POWER",
                65,
                29,
                15
            )

            screen.drawLine(
                52,
                38,
                108,
                38,
                2
            )

            screen.drawLine(
                52,
                38,
                52 + chargeTime * 56 / chargeMax,
                38,
                5
            )
        }

        // земля
        screen.fillRect(
            0,
            108,
            160,
            12,
            6
        )

        screen.fillRect(
            0,
            108,
            160,
            2,
            11
        )

        screen.print(
            "A HIT",
            4,
            113,
            15
        )

        screen.print(
            "B POWER",
            98,
            113,
            15
        )
    }
)

// ==================================================
// ЗАПУСК
// ==================================================

setArenaBackground(1)

game.splash(
    "SHADOW ARENA",
    "Create your fighter"
)

preview = sprites.create(
    hero.clone(),
    SpriteKind.Player
)

preview.setPosition(
    80,
    55
)

updateCostumePreview()