document.addEventListener("polymer-ready", function () {
    var toggleDrawer = document.getElementById("toggleDrawer"), drawerPanel =  document.getElementById("drawerPanel");
    toggleDrawer.addEventListener("click", function () {
        drawerPanel.togglePanel();
    });
    
    //Next with jQuery
    $(document).ready(function() {
        
        var menu = $("#page-nav"), drawerPanel = document.getElementById("drawerPanel"), dialog = $("#nt-dialog");
        menu.children().click(function() {
            var target = $(this).attr("data-link"); 
            if($(target).hasClass("active")) drawerPanel.closeDrawer();
            else {
                //$(".active").fadeOut().removeClass("active");
                document.location.href = target+".html";
                drawerPanel.closeDrawer();
            }
        });
        
        $(".card .inner").on("click", ".card-fab-show", function() {
            $(this).removeAttr("icon").attr("icon", "unfold-less").removeAttr("title").attr("title", "Спрятать").removeClass("card-fab-show").addClass("card-fab-hide");
            $("#innerHidden").slideDown();
        });
        
        $(".card .inner").on("click", ".card-fab-hide", function() {
            $(this).removeAttr("icon").attr("icon", "unfold-more").removeAttr("title").attr("title", "Раскрыть").removeClass("card-fab-hide").addClass("card-fab-show"); 
            $("#innerHidden").slideDown();
        });
        
        $("#go").click(function() {
            document.location.href = "solar_system.html";
        });
        
    });
    
});