const {UnitEngine} = UnitType;

const lib = require("library");

const exampleSnakeEnd = lib.segment("snakeEnd", {
    hitSize: 10,
    offsetSegment: -2,
    health: 600
}, {});

const exampleSnakeBody = lib.segment("snakeBody", {
    hitSize: 10,
    engineRotOffset: 90,
    engineOffset: 10,
    offsetSegment: -1,
    health: 600
}, {});

exampleSnakeBody.setEnginesMirror(
    new UnitEngine(10, 0, 3, 0)
);

const exampleSnake = lib.head("snake", {
    body: exampleSnakeBody,
    end: exampleSnakeEnd,
    lengthSnake: 10,
    hitSize: 10,
    speed: 1.5,
    health: 1000
}, {});


const weaponBombBullet = extend(MissileBulletType, 2.7, 12, {
    width: 6,
    height: 8,
    shrinkY: 0,
    drag: -0.003,
    homingRange: 60,
    keepVelocity: false,
    splashDamageRadius: 10,
    splashDamage: 5,
    lifetime: 80,
    trailColor: Color.gray,
    backColor: Pal.bulletYellowBack,
    frontColor: Pal.bulletYellow,
    hitEffect: Fx.blastExplosion,
    despawnEffect: Fx.blastExplosion,
    weaveScale: 8,
    weaveMag: 1
})

const weaponBomb = extend(Weapon, "snakeBody-weapon", {
    reload: 80,
    shots: 1,
    inaccuracy: 4,
    ejectEffect: Fx.casing3,
    shootSound: Sounds.artillery,
    rotate: true,
    shotDelay: 1,
    x: 0,
    y: -8 / 4,
    shootY: 17 / 4,
    mirror: false,
    top: true,
    shootCone: 2,
    bullet: weaponBombBullet
})


exampleSnakeBody.weapons.add(weaponBomb);

const factorySnake = extend(UnitFactory, "factorySnake", {
    size: 3,
    health: 100,
    produceTime: 100
});

factorySnake.plans.add(
    new UnitFactory.UnitPlan(exampleSnake, 2100, ItemStack.with(Items.silicon, 30, Items.metaglass, 20)));

factorySnake.setupRequirements(Category.units, ItemStack.with(Items.graphite, 45));