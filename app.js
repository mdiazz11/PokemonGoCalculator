//Module
var pokemonApp = angular.module('pokemonApp', []);

//Controller
pokemonApp.controller('resultsController', ['$scope', function($scope) {
    
    //Intializing 
    $scope.pokemonList = []; //list of pokemon the user has entered
    $scope.pokemon = "Choose Pokemon";    
    $scope.allPokemon = [
        {name: 'Weedle', candy: 12},
        {name: 'Caterpie', candy: 12},
        {name: 'Pidgey', candy: 12},
        {name: 'Pikachu', candy: 25},
        {name: 'Rattata', candy: 25},
        {name: 'Goldeen', candy: 25},
        {name: 'Zubat', candy: 50},
        {name: 'Ivysaur', candy: 100},
        {name: 'Magikarp', candy: 400}
    ];
    
    
    
    $scope.results = function(){
        //reset errors
        $scope.pokemonError = false;
        $scope.pokemonCountError = false;
        $scope.candyCountError = false;
        
        
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

            //Reset Inputs
            $scope.pokemon = "Choose Pokemon";
            $scope.pokemonCount = "";
            $scope.candyCount = "";
        }
        
    }
          
            
     $scope.calculate = function() {
        //Reset
         $scope.calculateList = [];
         $scope.transferCount = 0;
         $scope.evolutionCount = 0;
         
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
            evolutionFunc();
            
            $scope.calculateList.push({

                pokemon: $scope.pokemonList[i].pokemon,
                evolutionCount: $scope.evolutionCount,
                transferCount: $scope.transferCount
                
            })
            
        }
            
    }
}]);