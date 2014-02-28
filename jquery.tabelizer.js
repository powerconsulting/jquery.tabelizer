/*
 * 
 * Tabelizer 1.0 - multi level grouping indicators for tables
 * Version 1.0.0
 * @requires jQuery v1.6+ and jQuery.ui core
 * 
 * Copyright (c) 2014 Rafael Huisman
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */

/**
 * 
 * @description Create a table with multi level grouping indicators.
 * 
 * @example $('#table1').tabelize();
 * @desc Create a simple tabelized interface.
 */
 
(function($){
	var self = {};
	
	self.rowClicker = function(evt){
		var $elm = $(evt.currentTarget);
		var id = $elm.attr('id');
		if ($elm.hasClass('contracted')){
			$elm.removeClass('contracted').addClass('expanded');
			self.toggleChildren(id, true);
		}else{
			$elm.removeClass('expanded').addClass('contracted');
			self.toggleChildren(id, false);
		}
		
		self.updateLines();
		
	}
	
	self.updateLines = function(){
		//console.log('update lines' + self.maxLevel)
		var currentLevel = '';
		var prevLevel = '';
		$prevRow = null;
		$('#' + self.tableId + ' tr:not(.hidden)').each(function(){
			$row = $(this);
			if (!$row.hasClass('header')){
				currentLevel = $row.data('level');
			
				var rowClass = '';
				for(var x = self.maxLevel;x > 0;x--)
					$row.removeClass('l' + x + '-first').removeClass('l' + x + '-last')
				
				if (currentLevel != prevLevel){
					rowClass += ' l' + currentLevel + '-first'
					
					if (prevLevel != '' && prevLevel > currentLevel){
						for (var x = (prevLevel); x >= currentLevel; x--){
							$prevRow.addClass(' l' + (parseInt(x)) + '-last')
						}
					}
						
				}
				
				$row.addClass(rowClass)
				
				prevLevel = currentLevel;
				$prevRow= $row;
			}
		});
		
		if ($prevRow != null && prevLevel != '' && prevLevel > 1){
			for (var x = (prevLevel-1); x > 0; x--){
				$prevRow.addClass(' l' + (parseInt(x)) + '-last')
			}
		}
	}
	
	self.toggleChildren = function(id, display){
		var startAction = false;
		var stopAction = false;
		var prevRowLevel = null;
		var startLevel = 0;
		$('#' + self.tableId + ' tr').each( function(){
			var $row = $(this);
			var rowId = $row.attr('id');
			var rowLevel = $row.data('level');
			var skipAction = false;
			
			if (!startAction && rowId == id){
				startAction = true;
				startLevel = rowLevel;
			}
			else if (startAction && !stopAction && prevRowLevel != null && rowLevel == (startLevel)){
				//console.log('1')
				stopAction = true;
			}else if (display && (startAction && !stopAction && prevRowLevel != null && rowLevel != (startLevel + 1))){
				skipAction = true;
			}else if (!display && (startAction && !stopAction && prevRowLevel != null && rowLevel < (startLevel))){
				//console.log('cold turkey')
				stopAction = true;
				skipAction = true;
			}
			
			
			//console.log('rowId: ' + rowId + ' perform: ' + ((!skipAction && startAction && !stopAction &&  rowId != id)) + ' skip: ' + skipAction + ' level: ' + rowLevel + ' -> ' + (startLevel))
			
			if (!skipAction && startAction && !stopAction &&  rowId != id){
			
				//console.log(rowId);
			
				if (display){
					$row.removeClass('hidden');
					
					$row.find('td').wrapInner('<div style="display: none;" />').parent().find('td > div').slideDown(200, function(){
						var $set = $(this);
						$set.replaceWith($set.contents());
					 });
					
				}
				else{
					$row.find('td').wrapInner('<div style="" />').parent().find('td > div').slideUp(200, function(){
						var $set = $(this);
						$set.replaceWith($set.contents());
						$row.addClass('hidden');
					 });
					 
					$row.removeClass('expanded')
					$row.addClass('contracted');
				}
			}
			
			prevRowLevel = rowLevel;
		});
	}
	
	self.maxLevel = 0;
	self.init = function(){
	
		var currentLevel = '';
		var prevLevel = '';
		$prevRow = null;
		$('#' + self.tableId + ' tr').each( function(){
			$row = $(this);
			if (!$row.hasClass('header')){
				currentLevel = $row.data('level');
			
				var rowClass = 'l' + currentLevel + ' contracted ' + (currentLevel > 1 ? ' hidden' : '');
				if (currentLevel != prevLevel){
				
					rowClass += ' l' + currentLevel + '-first'
					
					if (prevLevel != '' && prevLevel > currentLevel){
						for (var x = (prevLevel); x >= currentLevel; x--){
							$prevRow.addClass(' l' + (parseInt(x)) + '-last')
						}
					}
						
				}
				
				if (currentLevel > self.maxLevel)
					self.maxLevel=parseInt(currentLevel);
				
				$row.addClass(rowClass)
				
				$firstCol = $($row.children('td')[0])
				var firstColVal = '<div class="label">' + $firstCol.html() + '</div>';
				var parentLevels = 0;
				
				var levelLines = '<div class="control"> ';
				for(var x = 0; x <= (currentLevel-1); x++){
					levelLines += ' <div class="line level' + (x + 1) + '"><div class="vert"></div><div class="horz"></div></div> ';
				}
				 levelLines += '</div>'
				 
				 $firstCol.html(levelLines + ' <div class="epxander"></div> ' + firstColVal);
				 
				$row.on('click', self.rowClicker);
				prevLevel = currentLevel;
				$prevRow= $row;
			}
		});
		
		if ($prevRow != null && prevLevel != '' && prevLevel > 1){
			for (var x = (prevLevel-1); x > 0; x--){
				$prevRow.addClass(' l' + (parseInt(x)) + '-last')
			}
		}
	}

	$.fn.tabelize = function(confProp){
		self.caller = this;
		self.tableId = this.attr('id');
		self.init();
	};
})(jQuery);