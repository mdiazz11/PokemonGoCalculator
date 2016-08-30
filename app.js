//Module
var pokemonApp = angular.module('pokemonApp', []);

//Controller
pokemonApp.controller('resultsController', ['$scope', function($scope) {
    
    //Intializing 
    $scope.pokemonList = []; //list of pokemon the user has entered
    $scope.pokemon = "Choose Pokemon";    
    $scope.allPokemon = [
        {name: 'Bulbasaur', candy: 25, active: true},
        {name: 'Ivysaur', candy: 100, active: true},
        {name: 'Charmander', candy: 25, active: true},
        {name: 'Charmeleon', candy: 100, active: true},
        {name: 'Squirtle', candy: 25, active: true},
        {name: 'Wartortle', candy: 100, active: true},
        {name: 'Caterpie', candy: 12, active: true},
        {name: 'Metapod', candy: 50, active: true},
        {name: 'Weedle', candy: 12, active: true},
        {name: 'Kakuna', candy: 50, active: true},
        {name: 'Pidgey', candy: 12, active: true},
        {name: 'Pidgeotto', candy: 50, active: true},
        {name: 'Rattata', candy: 25, active: true},
        {name: 'Spearow', candy: 50, active: true},
        {name: 'Ekans', candy: 50, active: true},
        {name: 'Pikachu', candy: 50, active: true},
        {name: 'Sanshrew', candy: 50, active: true},
        {name: 'Nidoran♀', candy: 25, active: true},
        {name: 'Nidorina', candy: 100, active: true},
        {name: 'Nidoran♂', candy: 25, active: true},
        {name: 'Nidorino', candy: 100, active: true},
        {name: 'Clefairy', candy: 50, active: true},
        {name: 'Vulprix', candy: 50, active: true},
        {name: 'Zubat', candy: 50, active: true},
        {name: 'Gloom', candy: 100, active: true},
        {name: 'Oddish', candy: 25, active: true},
        {name: 'Paras', candy: 50, active: true},
        {name: 'Venonat', candy: 50, active: true},
        {name: 'Diglett', candy: 50, active: true},
        {name: 'Meowth', candy: 50, active: true},
        {name: 'Psyduck', candy: 50, active: true},
        {name: 'Mankey', candy: 50, active: true},
        {name: 'Growlithe', candy: 50, active: true},
        {name: 'Poliwag', candy: 25, active: true},
        {name: 'Poliwhirl', candy: 100, active: true},
        {name: 'Abra', candy: 25, active: true},
        {name: 'Kadabra', candy: 100, active: true},
        {name: 'Machop', candy: 25, active: true},
        {name: 'Machoke', candy: 100, active: true},
        {name: 'Bellsprout', candy: 25, active: true},
        {name: 'Weepinbell', candy: 100, active: true},
        {name: 'Tentacool', candy: 50, active: true},
        {name: 'Geodude', candy: 25, active: true},
        {name: 'Graveler', candy: 25, active: true},
        {name: 'Ponyta', candy: 50, active: true},
        {name: 'Slowpoke', candy: 50, active: true},
        {name: 'Magnemite', candy: 50, active: true},
        {name: 'Doduo', candy: 50, active: true},
        {name: 'Seel', candy: 50, active: true},
        {name: 'Grimer', candy: 50, active: true},
        {name: 'Shellder', candy: 50, active: true},
        {name: 'Gastly', candy: 25, active: true},
        {name: 'Haunter', candy: 100, active: true},
        {name: 'Drowzee', candy: 50, active: true},
        {name: 'Krabby', candy: 50, active: true},
        {name: 'Voltorb', candy: 50, active: true},
        {name: 'Exeggcute', candy: 50, active: true},
        {name: 'Cubone', candy: 50, active: true},
        {name: 'Koffing', candy: 50, active: true},
        {name: 'Rhyhorn', candy: 50, active: true},
        {name: 'Horsea', candy: 50, active: true},
        {name: 'Goldeen', candy: 50, active: true},
        {name: 'Staryu', candy: 50, active: true},
        {name: 'Magikarp', candy: 400, active: true},
        {name: 'Eevee', candy: 25, active: true},
        {name: 'Omanyte', candy: 50, active: true},
        {name: 'Kabuto', candy: 50, active: true},
        {name: 'Dratini', candy: 25, active: true},
        {name: 'Dragonair', candy: 100, active: true}   
    ];
    
    
    $scope.results = function(){
        //reset errors
        $scope.pokemonError = false;
        $scope.pokemonCountError = false;
        $scope.candyCountError = false;
        $scope.editMode = false;
        
        
        //Error Mesages for incorrect inputs
        if($scope.pokemon === "Choose Pokemon")
            $scope.pokemonError = true;   
        
        if(isNaN(parseInt($scope.pokemonCount)) || parseInt($scope.pokemonCount) < 0)
            $scope.pokemonCountError = true;
        
        if(isNaN(parseInt($scope.candyCount)) || parseInt($scope.candyCount) < 0)
            $scope.candyCountError = true;
        
              
        //if(!($scope.pokemonError && $scope.pokemonCountError)) NOT THE SAME!!
        
        //Adding their pokemon 
        if(!$scope.pokemonError && !$scope.pokemonCountError && !$scope.candyCountError){
            $scope.pokemonList.push({
                pokemon: $scope.pokemon.name,
                candy: $scope.pokemon.candy,
                pokemonCount: parseInt($scope.pokemonCount),
                candyCount: parseInt($scope.candyCount)

            })
            
            
            //Remove Pokemon from dropdown list to prevent duplicates
            
            for (var i = 0; i < $scope.allPokemon.length; i++){
                if ($scope.allPokemon[i].name === $scope.pokemon.name){
                    $scope.allPokemon[i].active = false;
                    break;
                }
            }
            
            
            //$scope.allPokemon.splice($scope.allPokemon.indexOf($scope.pokemon),1);

            //Reset Inputs
            $scope.pokemon = "Choose Pokemon";
            $scope.pokemonCount = "";
            $scope.candyCount = "";
            $scope.editMode = false;
        }
    }
       
    
    $scope.deleteItem = function(index) {
        for (var i = 0; i < $scope.allPokemon.length; i++){
            if ($scope.allPokemon[i].name === $scope.pokemonList[index].pokemon){
                $scope.allPokemon[i].active = true;
                break;
            }
        }
        $scope.pokemonList.splice(index, 1);
    }
            
     $scope.calculate = function() {
         $scope.calculateList = [];
         
         
         var evolutionFunc = function(){            
            $scope.evolutionCount = Math.floor($scope.pokemonList[i].candyCount / $scope.pokemonList[i].candy);
            
            //Eggs remaining + # of pokemon
            var temp = ($scope.pokemonList[i].candyCount % $scope.pokemonList[i].candy) + $scope.pokemonList[i].pokemonCount;
            
            if(temp >= $scope.pokemonList[i].candy){
                
                $scope.evolutionCount += Math.floor(temp / $scope.pokemonList[i].candy);
                $scope.transferCount = $scope.pokemonList[i].pokemonCount - (temp % $scope.pokemonList[i].candy);
                
            }
        }
        
                
        for(var i = 0; i < $scope.pokemonList.length; i++)
        {
            //Reset
            $scope.transferCount = 0;
            $scope.evolutionCount = 0;
            //when calculate is clicked, the input field will disappear
            $scope.pokemonList[i].editMode = false;
            
            evolutionFunc();
            
            $scope.calculateList.push({

                pokemon: $scope.pokemonList[i].pokemon,
                evolutionCount: $scope.evolutionCount,
                transferCount: $scope.transferCount
                
            })
            
            
        }
            
    }
}]);