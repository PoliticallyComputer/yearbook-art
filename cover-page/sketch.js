var table;
var maxSalesInDay = 176;
var spacing = 130;
var columnsPerMonth = 7;
var monthWidth = columnsPerMonth * (spacing);
var monthHeight;

function preload()
{
    table = loadTable ('data/sales_updated.csv', 'csv', 'header');
}

// this function is called once at the beginning
function setup()
{
    // feel free to change the size
    createCanvas (2000, 3500, SVG);
    frameRate (60);
    // background (255);
    noStroke();

    monthHeight = ceil (31 / columnsPerMonth) * (spacing);

    // we access the month by its number
    var months = {9: new Month ("September", 31, ['3A', 'FF', 'AD']), 10: new Month ("October", 30, ['E4', '09', '7C']), //['51', 'E5', 'FF']
                  11: new Month ("November", 31, ['FB', 'ED', '00']), 12: new Month ("December", 30, ['8C', '07','F2']),
                  1: new Month ("January", 31, ['0C', 'CE', '6B']),   2: new Month ("February", 28, ['FF', '92', '00']),
                  3: new Month ("March", 31, ['12', '99', 'D6']),     4: new Month ("April", 30, ['ED', '1C', '24'])};

    var rows = table.getRows();

    // transfer sales data to months collection
    rows.forEach ((row) =>
    {
        if (true)//row.get ("Item") === "Ice Cream Sandwich")
        {
            var monthNum, date, time, qty;
            monthNum = int (row.get ("Date").substring (0, 2));
            date = row.get ("Date");
            time = row.get ("Time");
            qty = int (row.get ("Qty"));

            months[monthNum].addSale (date, time, qty);
        }
    });

    var h = 0;
    var i = 9;
    var whichCondition = 0;
    while (condition (whichCondition, i))
    {
        for (var j = 0; j < 2; ++j)
        {
            months[i].draw (j * monthWidth, h * monthHeight);
            ++i;

            if (i == 13)
            {
                i = 1;
                whichCondition = 1;
            }
        }

        ++h;
    };
}

function condition (whichCondition, i)
{
    if (whichCondition == 0)
        return i < 12;
    else
        return i < 4;
}

// this function is called once every frame i.e. 60 times per second
// most of your work will probably happen here
function draw()
{

}

// this function is called any time a key is pressed
function keyTyped()
{
    // just press any button to save your canvas as an svg
    // save();
    saveSVG();
}

class Month
{
    constructor (whichMonth, numDays, rgb)
    {
        this.whichMonth = whichMonth;
        this.numDays = numDays;
        this.rgb = unhex (rgb);
        this.sales = [];
    }

    draw (top, left)
    {
        console.log("================================" + this.whichMonth + " | " + this.sales.length);
        var rowNum = 0;
        // var maxSales = 0;

        var i = 0;
        while (i < this.numDays)
        {
            for (var j = 0; j < columnsPerMonth; ++j)
            {
                var numSalesInDay = this.getNumSalesInDay (i + 1);
                fill (this.rgb[0], this.rgb[1], this.rgb[2], map (numSalesInDay, 0, maxSalesInDay, 150, 255));

                var diameter = 8;
                if (numSalesInDay != 0)
                    diameter = map (numSalesInDay, 0, maxSalesInDay, 20, 120);

                ellipse (top + (spacing / 2) + (j * spacing),
                         left + (spacing / 2) + (rowNum * spacing),
                         diameter);

                // maxSales = max (maxSales, numSalesInDay);
                console.log(numSalesInDay);
                ++i;

                if (i >= this.numDays)
                    break;
            }

            ++rowNum;
        }

        // console.log ("Max Sale:" + maxSales);
    }

    addSale (date, time, qty)
    {
        this.sales.push (new Sale (date, time, qty));
    }

    getNumSalesInDay (dayNum)
    {
        var count = 0;
        this.sales.forEach ((sale) =>
        {
            if (int (sale.date.substring (3, 5)) === dayNum)
                count++;
        });

        return count;
    }
}

class Sale
{
    constructor (date, time, qty)
    {
        this.date = date;
        this.time = time;
        this.qty = qty;
    }
}
