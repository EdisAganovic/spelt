/// <reference path="../node_modules/@types/node/index.d.ts" />

import transformations from "./transformations";

export interface Dictionaries {
	misspelt: {
		[key: string]: string;
	};
	correct: {
		[key: string]: 1;
	};
}

export function build (dictString:string):Dictionaries {
	function appendToDictionary(entry:string,correctWord:string){
		if(!misspelt[entry]) misspelt[entry] = correctWord;
		else misspelt[entry] = misspelt[entry] + "|" + correctWord;
	}
	const misspelt:{[key:string]:string} = {};
	const correct:{[key:string]:1} = {};
	
	let sourceDictionary:string[] = dictString.split("\n");
	for (var index = 0; index < sourceDictionary.length; index++) {
		var word = sourceDictionary[index];
		// add to correct dictionary
		correct[word] = 1;
		// add transformations
		// remove the vowels
		let noVowels = word.replace(/aouiey/,"");
		for (var transformationIndex = 0; transformationIndex < transformations.length; transformationIndex++) {
			var rule = transformations[transformationIndex];
			appendToDictionary(word.replace(rule.regex,rule.replaceWith),word);
		}
	}
	return {misspelt,correct};
}


export default build;