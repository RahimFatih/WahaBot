const axios = require('axios');
const cheerio = require('cheerio');
const {XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const xml2js = require('xml2js');
const stringSimilarity = require('string-similarity');
const AsciiTable = require('ascii-table');
function extractData(webpage){
    //const parser = new XMLParser();
    let message = "";
    const parser = new xml2js.Parser({
        explicitArray: true
    });

    axios.get(webpage).then(({data}) => {
        //const $ = cheerio.load(data);
        //console.log($.html());
        //let jsonObj = parser.parse(data);
        //console.log(jsonObj.catalogue.sharedSelectionEntries.selectionEntry.filter(it => it.name === "Beastboss on Squigosaur"))
        let searched = 'Nob with';
        parser.parseString(data, function(err, result) {
            let characterData = result.catalogue.sharedSelectionEntries[0].selectionEntry.reduce(function(prev,curr){
                return stringSimilarity.compareTwoStrings(prev.$.name,searched) > stringSimilarity.compareTwoStrings(curr.$.name,searched) ? prev : curr;
            });
            message =message + characterData.$.name + "\n";
            characterCharacteristics=characterData.profiles[0].profile[0].characteristics[0].characteristic;
            var characteristicsNames =['Pt'];
            var characteristicsValues = [parseInt(characterData.costs[0].cost[0].$.value)];
            characterCharacteristics.forEach(function(item,index){
                characteristicsNames.push(item.$.name);
                characteristicsValues.push(item._);
            })
            message = message + new AsciiTable('Statystki')
                                    .addRow(characteristicsNames)
                                    .addRow(characteristicsValues)
            //console.log(characteristicsValues);

        });
        //console.log(meesage);
        //console.log(jsonObj.catalogue.sharedSelectionEntries.modifiers);
        console.log(message);
    });
}

extractData('https://raw.githubusercontent.com/BSData/wh40k/master/Orks.cat');

var table = new AsciiTable('A Title')
table
  .setHeading('', 'Name', 'Age')
  .addRow(1, 'Bob', 52)
  .addRow(2, 'John', 34)
  .addRow(3, 'Jim', 83)
 
//console.log(table.toString())
 
