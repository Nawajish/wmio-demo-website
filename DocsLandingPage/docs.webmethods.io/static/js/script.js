function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};


$(document).ready(function() {
    //active clas on nav bar
    $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');

    if (window.localStorage.getItem("showCookieBar") == null) {
        window.localStorage.setItem("showCookieBar", 'show');
    }
    if (window.localStorage.getItem("showCookieBar") == "show") {
        $('.cookie-disclaimer').show();
    } else {
        $('.cookie-disclaimer').hide();
    }
    $('.cookie-disclaimer .disclaimer-close').on('click', function() {
        $('.cookie-disclaimer').hide();
    });
    $('.cookie-disclaimer .got-it').on('click', function() {
        window.localStorage.setItem("showCookieBar", 'hide');
        $('.cookie-disclaimer').hide();
    });


    var scrollPos = 160;
    var currPos = $(this).scrollTop();
    var search_query;

    /*sidebar height*/
    var windowHeight = $(window).height();
    var mainWrapperHeight = $('.main-wrapper').height();


    /*----------------------------*/
    // wrapperHeight();
    $(window).scroll(function() {

        var windowHeight = window.innerHeight,
            windowTopHeight = $(window).scrollTop();
        totalHeight = windowTopHeight + windowHeight;
        footerOffset = $('.flow-pricing-footer').offset().top;
        gotoTop = $('.up-arrow');
        var scroll_top = $(window).scrollTop();
        var currentWinHeight = footerOffset - totalHeight;
        if (currentWinHeight <= 0) {
            gotoTop.css({
                'bottom': -(currentWinHeight - 20)
            });
        } else {
            gotoTop.css({
                'bottom': '20px'
            });
            if (scroll_top == 0) {
                gotoTop.css({
                    'bottom': '-45px'
                });
            } else {
                gotoTop.css({
                    'bottom': '20px'
                });
            }
        }
    });

    $(window).scroll(function() {
        var currPos = $(this).scrollTop();
        var el = $('.vertical-nav');
        var stickyHeight = el.height();
        var articles = $('.articles').length;
        var sample_flows = $('.sample-flows').length;
    });

    $('.up-arrow').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    });

    $('.home-search-box .close').on('click', function(e) {
        hideSuggestions();
        $('input').val('');
    });


    $('.default-search span.close').addClass('hidden');

    var isOpen = false;
    $('.home-search-box .close').addClass('hidden');
    $('.tag-lists li .tags').on('click', function() {
        //$('.search-result').hide();
    });
    $('.search-input').on('keyup', debounce(function(e) {
        search_query = this.value;

        if (e.keyCode == 13) {
            if (search_query == "") {
                hideSuggestions();

            } else if (search_query) {
                e.preventDefault();
                console.log("search_query", search_query);
                window.location = "/search?query=" + search_query;
            }
        } else {
            if (search_query == "") {
                hideSuggestions();
            }
            if (search_query) {
                var currTag = $('.tag-lists li .tags:visible').text();
                getSuggestions(currTag, search_query);

            }
        }
    }, 250));


    function showSuggestions() {
        if (isOpen == false) {
            $('.home-search-box .close').removeClass('hidden');
            $('.search-result').css('display', 'block');
            $('.default-search span.close').removeClass('hidden');
            $('.default-search .search-result').css('display', 'block');

            isOpen = true;
        }

    }

    function hideSuggestions() {
        if (isOpen == true) {
            $('.search-result').css('display', 'none');
            $('.home-search-box .close').addClass('hidden');
            $('.default-search .search-result').css('display', 'none');
            $('.default-search span.close').addClass('hidden');
            isOpen = false;
        }

    }

    function getSuggestions(index, search_query) {
        var url;
        if (index) {
            index = index.toLowerCase().replace(/ /g, "");
        }
        index ? url = '/jsonData/search?index=' + index + '&query=' + search_query : url = '/jsonData/search?query=' + search_query;
        url = url + '&skip=0&limit=20';
        $('.search-loader').show();
        $('.form-group .content-wrap').scrollTop(0);
        var search_results_show = false;
        $('.search-no-results').hide();

        if ($('.search-close:visible').length != 0) {
            $('.search-close:visible').hide();
            search_results_show = true;

        }
        var result = null;
        
        if(window.location.hostname != 'localhost'){
        	$.get(url, function(result) {
      		  	result = result;
      		  	processResult(result, search_results_show);
        	});
        }else{
        	result =  {"hits":{"hits":[{"_source":{"title":"Get Campaign Mail Client Usage","index":"Campaign Monitor","type":"","url":"https://flowdocs.built.io/services/campaign-monitor/activities/get-campaign-mail-client-usage","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/campaign-monitor\">Campaign Monitor</a></li> <li class=\"active\">Get Campaign Mail Client Usage</li> ","desc":"Campaign  Monitor is email marketing software that helps businesses create  send  and optimize email marketing campaigns   This activity lists the email clients subscribers used to open the specified campaign   It returns the name of the email client  its version  and the percentage as well as the number of subscribers who used it to open the campaign     To achieve this  add this activity to your canvas and configure it   Select an appropriate access token for  Campaign  Monitor   If you haven t created any access token  select   Add  New  to create one   In the   Campaign  I D  field  specify the  I D of the campaign you want the data for   Once you enter this  I D  click on   Done  and run the flow   This will return the list of email clients subscribers used to open the specified campaign                                            Output                                                                               Get  Campaign  Mail  Client  Usage                                                                         Campaign  Mail  Client  Usage            array                                                                          Client              string                                                                             Version              string                                                                             Percentage              number                                                                             Subscribers              string"},"highlight":{"title":["Get Campaign <b>Mail</b> Client Usage"]}},{"_source":{"title":"Campaign Monitor","index":"Campaign Monitor","type":"Sales & Marketing","url":"https://flowdocs.built.io/services/campaign-monitor","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Campaign Monitor</li> ","desc":"Activities                                                       Create  Campaign          Create a new campaign                   Create  List          Create a new list                   Create  Segment          Create a new segment for a specific list                   Delete  Campaign          Delete a specific campaign                   Delete  List          Delete a specific subscriber list                   Delete  Segment          Delete a specific segment                   Get  Campaign  Bounces          Retrieve a list of subscribers who bounced for a specific campaign                   Get  Campaign  Clicks          Retrieve a list of subscribers who clicked on a link for a specific campaign                   Get  Campaign  Mail  Client  Usage          Retrieve a list of email  client subscribers                   Get  Campaign  Opens          Retrieve a list of subscribers who opened a specific campaign                   Get  Campaign  Recipients          Retrieve a list of subscribers to whom a specific campaign was sent                   Get  Campaign  Spam  Complaints          Retrieve a list of all subscribers who have marked the a specific campaign as spam                   Get  Campaign  Summary          Retrieve all details of a specific campaign                   Get  Clients          Retrieve the details of all the clients                   Get  Draft  Campaigns          Retrieve all draft campaigns of a specific client                   Get  List  Details          Retrieve the details of a specific subscriber list                   Get  List  Stat          Retrieve the statistical details of a specific list                   Get  List of  Bounced  Subscribers          Retrieve subscribers of a specific list who bounced                   Get  Lists          Retrieve all the lists of a specific campaign                   Get  Scheduled  Campaigns          Retrieve the details of all scheduled campaigns of a specific client                   Get  Segment  Details          Retrieve the details of a specific segment                   Get  Segments          Retrieve all segments of a specific list                   Get  Sent  Campaigns          Retrieve the details of sent campaigns of a specific client                   Update  List          Update an existing list                   Update  Segment          Update an existing segment                                                                                          Triggers                                                       Subscriber  Updated          Triggers when an existing subscriber is updated                   Subscribers  Added          Triggers when new subscribers are added                   Subscribers  Unsubscribe          Triggers when existing subscribers unsubscribe"},"highlight":{"title":["Campaign <b>Monitor</b>"]}},{"_source":{"title":"List Air Marshal Scan Results","index":"Cisco Meraki","type":"IoT","url":"https://flowdocs.built.io/services/cisco-meraki","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Cisco Meraki</li> ","desc":"Retrieve the list of air marshal scan results"},"highlight":{"title":["List Air <b>Marshal</b> Scan Results"]}},{"_source":{"title":"MS SQL Query","index":"MS SQL","type":"","url":"https://flowdocs.built.io/services/ms-sql/activities/ms-sql-query","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/ms-sql\">MS SQL</a></li> <li class=\"active\">MS SQL Query</li> ","desc":"M S  S Q L is  Microsoft s relational database management software that lets you store and retrieve data at any point of time   This activity lets you fire a query to perform a specific operation on your database   To achieve this  add this activity to your canvas  and configure it   Select the appropriate connection for  M S  S Q L from the drop down list   If you haven t created a connection yet  select   Add  New  to create one    Field data   Query   Mandatory    Enter the  M S  S Q L query to perform a specific operation     Once you have entered all the details  click on   Done  and   Run  the flow   This will perform a specific operation on the database depending upon the query                                           Output                                                                               M S  S Q L  Query                                                                        result            array"},"highlight":{"title":["<b>MS</b> SQL Query"]}},{"_source":{"title":"Get List of Members","index":"MailChimp","type":"","url":"https://flowdocs.built.io/services/mailchimp/activities/get-list-of-members","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/mailchimp\">MailChimp</a></li> <li class=\"active\">Get List of Members</li> ","desc":"What s  Mailchimp   Mail Chimp is an email marketing service provider that helps you send emails to your potential customers and track the results    About   Get  List of  Members  activity   This activity retrieves all the members of a list of a particular status    Connect to  Mailchimp   Select the appropriate connection for  Slack from the drop down list   If you haven t created a connection yet  select   Add  New  to create one    Field data   List  I D  mandatory    Enter the  I D of the list of which you wish to get the members   To find the  List  I D in  Mailchimp  go to the desired list page  and under the   Settings   click the   List  Name and  Defaults  option   You will find the  List  I D there on the right hand side of the page    Status  mandatory    Select the status of which you wish to get the members   Available options are  Subscribed   Unsubscribed  and  Cleaned     Start  options    Enter the page number to start from   Defaults to 1    Limit  optional    Enter the maximum number of results to be returned   Default is set to 25  and maximum allowed is 100    Sort  Field  mandatory    Select the field by which you wish to sort the results   Available options are email  rating  last update time  and optin time     Sort by  mandatory    Select the sorting order for the list   Available options are  A S C and  D E S C     Segment  optional    Enter a properly formatted segment that works with campaigns segment test                                            Output                                                                               Get  List of  Members                                                                        total            integer                                                                                                             data            array                                                                         email              string                                                                            id              string                                                                            euid              string                                                                            email type              string                                                                            ip signup              null                                                                            timestamp signup              null                                                                            ip opt              string                                                                            timestamp opt              string                                                                            member rating              integer                                                                            info changed              string                                                                            web id              integer                                                                            leid              integer                                                                            language              null                                                                            list id              string                                                                            list name              string                                                                            merges              object                                                                            status              string                                                                            timestamp              string                                                                            is gmonkey              boolean                                                                            lists              array                                                                            geo              array                                                                            clients              array                                                                            static segments              array                                                                            notes              array"},"highlight":{"title":["Get List of <b>Members</b>"]}},{"_source":{"title":"MailChimp","index":"MailChimp","type":"Sales & Marketing","url":"https://flowdocs.built.io/services/mailchimp","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">MailChimp</li> ","desc":"Activities                                                       Delete  Campaign          Delete an existing campaign                   Get  Campaign  Content          Retrieve content of a campaign                   Get  Campaign  Ready  Status          Retrieve status of the given campaign                   Get  List of  Campaigns          Retrieve list of existing campaigns                   Get  List of  Members          Get members of a list                   Schedule  Campaign          Schedule a campaign to be sent at a later date or time                   Send  Campaign  Immediately          Send an existing campaign immediately                   Unschedule  Campaign          Unschedule a scheduled campaign                                                                                           Triggers                                                       Subscribe  List          Triggers when a list is subscribed                   Unsubscribe  List          Triggers when a list is unsubscribed"},"highlight":{"title":["<b>MailChimp</b>"]}},{"_source":{"title":"Get Multiple Lists","index":"Marketo","type":"Sales & Marketing","url":"https://flowdocs.built.io/services/marketo","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Marketo</li> ","desc":"Retrieve one or more lists"},"highlight":{"title":["Get <b>Multiple</b> Lists"]}},{"_source":{"title":"List Marketo Activity Types","index":"Marketo","type":"Sales & Marketing","url":"https://flowdocs.built.io/services/marketo","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Marketo</li> ","desc":"Retrieve the list of all activity types"},"highlight":{"title":["List <b>Marketo</b> Activity Types"]}},{"_source":{"title":"Merge Leads","index":"Marketo","type":"Sales & Marketing","url":"https://flowdocs.built.io/services/marketo","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Marketo</li> ","desc":"Merge a winning lead with a losing lead"},"highlight":{"title":["<b>Merge</b> Leads"]}},{"_source":{"title":"New Mention","index":"Mention","type":"","url":"https://flowdocs.built.io/services/mention/triggers/new-mention","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/mention\">Mention</a></li> <li class=\"active\">New Mention</li> ","desc":"Mention is a monitoring tool that helps businesses monitor social media and the web   Any event within  Mention can be set as a trigger for your flow   Now whenever the specified event happens  the associated flow will run automatically     To set any  Mention event as trigger  you first need to switch on the trigger toggle button located near the   Start  icon in your flow   Then  from the list of triggers under   All  Triggers  on the right  drag and drop  Mention in to the given box     Once you are done with this  select any event of your choice that you wish to set as trigger from the   Select  Trigger  dropdown options   Let us have a look at the various  Mention events that you can set as triggers    New  Mention   This trigger runs the associated flow automatically whenever there is a new mention in a particular alert   To set this as trigger  select the required access token for  Mention  and enter your mention  Account  I D   Then  enter the  I D of the alert to which you wish to listen for mentions   Once you enter these details  click   Save   and then   Done  to return to your flow canvas                        Once you have entered all the details    Save  them and click on   Done    This will take you back to canvas"},"highlight":{"title":["New <b>Mention</b>"]}},{"_source":{"title":"Mention","index":"Mention","type":"Social","url":"https://flowdocs.built.io/services/mention","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Mention</li> ","desc":"Activities                                                        Create  Alert          Create a new alert                    Delete  Alert          Delete an existing alert                    Get  Account  I D          Retrieve  U R L of the caller s  Mention account                    Get  Alerts          Retrieve list of all the alerts associated with your  Mention account                    Share  Alert          Share an alert with another user                    Update  Alert          Update an existing alert                                                                                          Triggers                                                       New  Alert          Triggers when a new alert is created                   New  Mention          Triggers when a new mention is created"},"highlight":{"title":["<b>Mention</b>"]}},{"_source":{"title":"MetaMeetings","index":"MetaMeetings","type":"Project Management","url":"https://flowdocs.built.io/services/metameetings","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">MetaMeetings</li> ","desc":"Activities                                                       Create  Event          Create a new event                   Create  Room          Create a new room                   Create  Session          Create a new session                   Create  User          Create a new user                   Delete  Event          Delete the specified event                   Delete  Room          Delete the specified room                   Delete  Session          Delete a particular session                   Delete  User          Delete the specified user                   Update  Event          Update the specified event                    Update  Room          Update the specified room                   Update  Session          Update the specified session                   Update  User          Update the specified user"},"highlight":{"title":["<b>MetaMeetings</b>"]}},{"_source":{"title":"Mixpanel","index":"Mixpanel","type":"DevOps","url":"https://flowdocs.built.io/services/mixpanel","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">Mixpanel</li> ","desc":"Activities                                                        Create  Annotation          Create an annotation at a specific time                    Delete  Annotation          Delete an existing annotation                    Get  Annotations          Retrieve list of all the annotations for a specific date range                    Get  Events          Retrieve more details about an event or multiple events                    Get  Funnel  Details          Retrieve more details about a particular funnel                    Get  Funnel  List          Retrieves list of all the funnels associated with the current logged in user                    Get  Top  Events          Retrieve list of top events for the day along with their counts and normalized percentage change from the previous day"},"highlight":{"title":["<b>Mixpanel</b>"]}},{"_source":{"title":"Modify Cluster","index":"MongoDB Atlas","type":"","url":"https://flowdocs.built.io/services/mongodb-atlas/activities/modify-cluster","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/mongodb-atlas\">MongoDB Atlas</a></li> <li class=\"active\">Modify Cluster</li> ","desc":"What s  Mongo D B  Atlas   Mongo D B  Atlas is a cloud service that lets you set up  operate  and scale your  Mongo D B deployments with ease About   Modify  Cluster  action   This action lets you update an existing cluster of your  Mongo D B  Atlas account    Connect to  Mongo D B  Atlas   Select the appropriate connection for  Mongo D B  Atlas from the drop down list   If you haven t created a connection yet  select   Add  New  to create one  Field data Group  I D   Mandatory    Enter the  I D of the group under which the cluster is created   Cluster  Name   Mandatory    Enter the name of the cluster you wish to modify   Backup  Enabled   Mandatory    Specify if you wish to enable backup for the cluster   Available options are   True  and   False    By default  the value for this field is set to   True    If set to true  the  Atlas  Backup service takes snapshots of your databases at regular intervals and retains them according to your group s retention policy  Encrypt  E B S  Volume   Mandatory    Specify if you wish to encrypt the  E B S volume   Available options are   True  and   False    By default  the value for this field is set to   False    This field is specific for  A W S only   If set to   True   the  Amazon  E B S encryption feature encrypts the server s root volume for both data at rest within the volume and for data moving between the volume and the instance  Provider  Name   Mandatory    Enter the cloud service provider on which the servers are provisioned   Currently  Mongo D B  Atlas integrates with  Amazon  Web  Services   A W S  only   Hence  this field must be set to  A W S until other integrations become available  Disk  I O P S   Optional    Enter  The maximum input output operations per second   I O P S  the system can perform   The available  I O P S depend on the instance size   Each instance size has a specific set of available  I O P S values   To view available values  use the  Atlas interface to either view an existing configuration or add a new one and click an instance size to view the available value   Instance  Size   Mandatory    Enter the instance size for your cluster   This  Instance size that will be used for all the servers of your cluster   Available instance sizes are    M10     M20     M30     M40     M50     M60   and    M100    Replication  Factor   Optional    Enter the number of copies  nodes  of your data you wish to include in the cluster   Available options are   3    5  and   7    Disk  Size   G B    Optional    Enter the size of server s root volume in gigabytes   You can add capacity by increasing this number  up to a maximum possible value of 16384  i e   16  T B   Once you have entered the details  click on   Done  and   Run  the flow   This will update an existing cluster of your  Mongo D B  Atlas  Account   Refer to  A P I documentation for more information  https   docs atlas mongodb com reference api clusters  modify a cluster                                        Output                                                                               Modify  Cluster                                                                        backup Enabled            boolean                                                                                                             disk Size G B            number                                                                                                             group Id            string                                                                                                             links            array                                                                                                             mongo D B Major Version            string                                                                                                             mongo D B Version            string                                                                                                             mongo U R I Updated            string                                                                                                             name            string                                                                                                             num Shards            number                                                                                                             provider Settings            object                                                                                                             replication Factor            number                                                                                                             state Name            string"},"highlight":{"title":["<b>Modify</b> Cluster"]}},{"_source":{"title":"MongoDB Atlas","index":"MongoDB Atlas","type":"Developer","url":"https://flowdocs.built.io/services/mongodb-atlas","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li class=\"active\">MongoDB Atlas</li> ","desc":"Activities                                                       Acknowledge  Alert          Mark an existing alert as acknowledged                   Add  Group  Whitelist  Entry          Create a new whitelist entry under the specified group                   Create  Cluster          Create a new cluster                    Create  Database  User          Create a new database user                   Delete  Cluster          Delete the specified cluster                   Delete  Database  User          Delete the specified database user                   Delete  Group  Whitelist  Entry          Delete the specified whitelist entry                   Get  Alert          Retrieve a specific alert                   Get  Alerts          Retrieve some or all alerts                   Get  Cluster          Retrieve a specific cluster                   Get  Database  User          Retrieve a specific database user                   Get  Database  Users          Retrieve all database users of the specified group                   Get  Group  Whitelist          Retrieve the whitelist of the specified group                   Get  Whitelist  Entry          Retrieve the specified whitelist entry                   Modify  Cluster          Update an existing cluster                   Update  Database  User          Update the details of an existing database user"},"highlight":{"title":["<b>MongoDB</b> Atlas"]}},{"_source":{"title":"Get Binder Messages","index":"Moxtra","type":"","url":"https://flowdocs.built.io/services/moxtra/activities/get-binder-messages","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/moxtra\">Moxtra</a></li> <li class=\"active\">Get Binder Messages</li> ","desc":"Moxtra provides embeddable mobile collaboration solutions for better team and project management   This activity lets you retrieve all the messages  along with the details  of a binder   To achieve this  add this activity to your canvas and configure it   Select the appropriate access token for  Moxtra from the drop down list   If you haven t created an access token yet  select   Add  New  to create one     Field data  Binder  I D   Mandatory    Select specify the  I D of the binder of which you wish to get the messages   You can also search the binder by its name or  I D   Timestamp   Optional    Provide a timestamp in milliseconds  starting from 1 1 1970    Count   Optional    Specify the maximum number of results you wish to retrieve     Once you have entered all the details  click on   Done  and   Run  the flow   This will retrieve the messages from the specified binder   Refer to  Moxtra  A P I documentation for more information  https   developer moxtra com docs docs rest api conversation  get binder conversation                                          Output                                                                               Get  Binder  Messages                                                                        code            object                                                                                                             data            object"},"highlight":{"title":["Get Binder <b>Messages</b>"]}},{"_source":{"title":"Get Meet List","index":"Moxtra","type":"","url":"https://flowdocs.built.io/services/moxtra/activities/get-meet-list","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/moxtra\">Moxtra</a></li> <li class=\"active\">Get Meet List</li> ","desc":"Moxtra provides embeddable mobile collaboration solutions for better team and project management   This activity lets you retrieve the list of all scheduled meets of a specified user   To achieve this  add this activity to your canvas and configure it   Select the appropriate access token for  Moxtra from the drop down list   If you haven t created an access token yet  select   Add  New  to create one    Field data  User  I D   Mandatory    Select specify the  I D of the user whose scheduled meet list you wish to retrieve   You can also search the user by his name or  I D   Starts   Optional    Specify the scheduled start time for the meet in  I S O 8601 format  i e    Y Y Y Y  M M  D D Thh mm ss Z with  U T C time zone   Days   Optional    Provide the number of days left for the meet to start    Tags  Include   Optional    Provide the list of meets  including tags separated by comma     to perform  O R operation   Tags  Exclude   Optional    Provide a list of meets excluding tags separated by comma     to perform  O R operation    Once you have entered all the details  click on   Done  and   Run  the flow   This will retrieve a list of all scheduled meets for a specified user    Refer to  Moxtra  A P I documentation for more information  https   developer moxtra com docs docs rest api meet  get meet list                                          Output                                                                               Get  Meet  List                                                                        code            string                                                                                                             data            object"},"highlight":{"title":["Get <b>Meet</b> List"]}},{"_source":{"title":"Invite Users to Meet","index":"Moxtra","type":"","url":"https://flowdocs.built.io/services/moxtra/activities/invite-users-to-meet","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/moxtra\">Moxtra</a></li> <li class=\"active\">Invite Users to Meet</li> ","desc":"Moxtra provides embeddable mobile collaboration solutions for better team and project management   This activity lets you invite the users of your  Moxtra account to a particular meet   To achieve this  add this activity to your canvas and configure it   Select the appropriate access token for  Moxtra from the drop down list   If you haven t created an access token yet  select   Add  New  to create one    Field data  Session  Key   Mandatory    Select specify the session key for the meet    User  Type   Mandatory    Specify the way you wish to add users to the invite list   There are two options   Email and  User  I D           Email   If you select the   Email  option   you can select specify the email  I D of the user to whom you wish to invite for the meet   You can also search the email  I D of the user by his name          User  I D   If you select the   User  I D  option  you can select specify the  I D of the user to whom you wish to invite for the meet   You can also search the  I D of the user by his name   Session  I D   Mandatory    Enter the session  I D for the meet   It can be obtained using the callback event from start meet  S D K   Message   Mandatory    Enter the message that you wish to send in the email invitation   Email  Off   Mandatory    Specify if you wish to turn off sending email   By default  the value for this field is set to   False    Notification  Off   Optional    Specify if you wish to turn off push notifications   By default  the value for this field is set to   False     Once you have entered the details  click on   Done  and   Run  the flow   This will send an invite to all the specified users for a meet    Refer to  Moxtra  A P I documentation for more information  https   developer moxtra com docs docs rest api meet  invite users                                          Output                                                                               Invite  Users to  Meet                                                                        code            string"},"highlight":{"title":["Invite Users to <b>Meet</b>"]}},{"_source":{"title":"Move pages from one binder to another","index":"Moxtra","type":"","url":"https://flowdocs.built.io/services/moxtra/activities/move-pages-from-one-binder-to-another","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/moxtra\">Moxtra</a></li> <li class=\"active\">Move pages from one binder to another</li> ","desc":"Moxtra provides embeddable mobile collaboration solutions for better team and project management   This activity lets you move pages from one binder to another   To achieve this  add this activity to your canvas and configure it   Select the appropriate access token for  Moxtra from the drop down list   If you haven t created an access token yet  select   Add  New  to create one    Fields data  Binder  I D   Mandatory    Select specify the  I D of the binder from which you wish to move page s    You can also search the binder by its name or  I D   Source  I D   Mandatory    Enter the  I D of the binder to which you wish to move the page s    You can also search the source by its name or  I D   Page  I D   Mandatory    Enter the  I D of the page that you wish to move   You can also search the page by its name or  I D   You can also move multiple pages by clicking on    A D D  link    Once you have entered all the details  click on   Done  and   Run  the flow   This will move the specified pages from one binder to another   Refer to  Moxtra  A P I documentation for more information  https   developer moxtra com docs docs rest api page  move some pages                                         Output                                                                               Move pages from one binder to another                                                                        code            string"},"highlight":{"title":["<b>Move</b> pages from one binder to another"]}},{"_source":{"title":"Post Binder Message","index":"Moxtra","type":"","url":"https://flowdocs.built.io/services/moxtra/activities/post-binder-messages","breadcrumb":" <li><a href=\"/\">Docs</a></li> <li><a href=\"/services\">Services</a></li> <li><a href=\"/services/moxtra\">Moxtra</a></li> <li class=\"active\">Post Binder Message</li> ","desc":"Moxtra provides embeddable mobile collaboration solutions for better team and project management   This activity lets you post a message on binder chat   To achieve this  add this activity to your canvas and configure it   Select the appropriate access token for  Moxtra from the drop down list   If you haven t created an access token yet  select   Add  New  to create one    Field data  Binder  I D   Mandatory    Select specify the  I D of the binder to which you wish to post the message   You can also search the binder by its name or  I D   Text   Mandatory    Enter the message that you wish to post on binder   Rich  Text   Optional    Enter the message in  B B Code style  e g    b   Hello  b    While setting the rich text  please enter the value for   Text  field as well as the feed to use    Once you have entered the details  click on   Done  and   Run  the flow   This will post the specified message to the binder   Refer to  Moxtra  A P I documentation for more information  https   developer moxtra com docs docs rest api conversation  add message                                         Output                                                                               Post  Binder  Message                                                                        code            object                                                                                                             data            object"},"highlight":{"title":["Post Binder <b>Message</b>"]}}]}}
        	processResult(result, search_results_show);
        }
        
     
        
    }

    function processResult(result, search_results_show){
	   if(result) {
	    	$('.search-loader').hide();
	        if (search_results_show)
	            $('.search-close').show();
	        if (result.hits) {
	            var hits = result.hits.hits;
	            var groupedData;
	            var searchData = [];
	            _.each(hits, function(data) {
	                var hits = {};
	                hits.data = data._source;
	                if (data.highlight && data.highlight.title)
	                    hits.title = data.highlight.title;
	                searchData.push(hits);
	            });

	            groupedData = _.groupBy(searchData, function(d) {
	                return d.data.index
	            });
	            appendData(groupedData);
	        } else {
	            hideSuggestions();
	            $('.search-no-results').show();
	        }
        }
    }

    function removeSuggestions() {
        $('.search-result ul').empty();
    }

    function appendData(groupedData) {
        if (groupedData) {
            removeSuggestions();

            _.map(groupedData, function(parent_index, key) {

                var skip = false;
                _.map(parent_index, function(child_type) {
                    if (child_type.data.type && skip === false) {
                        //$('.search-result ul').append('<li class="suggestion index-url"><a><span><b>'+key+'</b></span></a><a class=" srvc-category"><span class="tags">'+ child_type.data.type+'</span></a></li>');
                        skip = true;
                    }
                })
                if (skip === false) {
                    //$('.search-result ul').append('<li class="suggestion removehref"><a><span><b>' + key + '</b></span></a></li>');
                }

                _.map(parent_index, function(child_type) {
                    // console.log(child_type.data.type);
                    if (!child_type.title) {
                        child_type.title = child_type.data.title;
                    }

                    //to remove "/" from url when appear atlast
                    var url = (child_type.data.url).trim();
                    if (url.substr(url.length - 1) === "/") {
                        url = url.substring(0, url.lastIndexOf("/"))
                    }
		    if(child_type.title !== ""){
                 	$('.search-result ul').append('<li class="suggestion"><a href=' + url + '><span>' + child_type.title + '</span></a></li>');
		    }

                });
            });
            showSuggestions();
        } else {
            hideSuggestions();
        }
    }

    function addParentTags(tag) {
        var currTag = $(tag).text();
        if ($(tag).parent().parent().hasClass("parent")) {

            $('.tag-lists').append('<li class="parent"><span class="tags">' + currTag + '<i class="fa fa-close"></i></span></li>');
            getSuggestions(currTag, search_query);
            $('.search-result ul').off('click');
        } else {

            $('.tag-lists').append('<li class="suggestion"><span class="tags">' + currTag + '<i class="fa fa-close"></i></span></li>');
        }
    }

    function addSuggestionTags(tag) {
        var currTag = $(tag).text();
        if ($(tag).parent().parent().hasClass("suggestion")) {

            $('.tag-lists').append('<li class="suggestion"><span class="tags">' + currTag + '<i class="fa fa-close"></i></span></li>');
            getSuggestions(currTag, search_query);
            $('.search-result ul').off('click');
        } else {
            $('.tag-lists').append('<li class="suggestion"><span class="tags">' + currTag + '<i class="fa fa-close"></i></span></li>');
        }
    }

    $('.tag-lists').on('click', '.fa-close', function() {

        $(this).parent().parent().remove();
        getSuggestions(null, search_query);
        $('.search-result ul').off('click', '.parent .tags').on('click', '.parent .tags', function() {
            $('.search-input').val('');
            addParentTags(this);
        });
    });


    $('.close.search-close').click(function() {
        $('.tag-lists li', $(this).parent()).remove();
        $('.search-result ul').off('click', '.parent .tags').on('click', '.parent .tags', function() {
            $('.search-input').val('');
            addParentTags(this);
        });
    });


    $('.minimize').click(function() {
        $('.output-parent').toggleClass('hide');
    });



    $('.default-search .title-bar .close').click(function() {
        $('.default-search.modal').modal('hide');
        $('.tags').hide();
        $('.search-no-results').hide();
        hideSuggestions();
        $('.default-search .search-input').val('');
        $('.search-result ul').off('click', '.parent .tags').on('click', '.parent .tags', function() {
            $('.search-input').val('');
            addParentTags(this);
        });
    });

    $('#myModal').on('hidden.bs.modal', function(e) {
        $('.tags').hide();
        $('.search-no-results').hide();
        hideSuggestions();
        $('.default-search .search-input').val('');
        $('.search-result ul').off('click', '.parent .tags').on('click', '.parent .tags', function() {
            $('.search-input').val('');
            addParentTags(this);
        });
    })

    $('.default-search span.close').click(function() {
        hideSuggestions();
        $('.default-search .search-input').val('');
    });

    $(document).ready(function() {
        $('.search-input').val('');
    });


    /*********************integrate form*******************/
    //Start Blueprint form for Salesforce
    $('#drip-salesforce-modal-form').on('submit', function(ev) {
        var data = {
            "first_name": $('#drip-salesforce-modal-form input[name="fields[first_name]"]').val(),
            "last_name": $('#drip-salesforce-modal-form input[name="fields[last_name]"]').val(),
            "company": $('#drip-salesforce-modal-form input[name=cm-f-tyirlh]').val(),
            "email": $('#drip-salesforce-modal-form input[name="fields[email]"]').val(),
            "job_title": $('#drip-salesforce-modal-form input[name="fields[job_title]"]').val(),
            "phone_number": $('#drip-salesforce-modal-form input[name="fields[phone_number]"]').val(),
            "campaign_name": "Integration Blueprint for Salesforce"
        }
        sendDatatoFlow(data);
        var that = this;
        setTimeout(function() {
            that.reset();
        }, 4000);
        var linkPdf = $(that).find(".pdf-download").attr('data-pdf');
        var redirectUrl = $(that).find(".pdf-download").attr('data-href');
        window.open(linkPdf, '_blank');
        $('#about-project-dialog_sales').modal('toggle');
        location.href = redirectUrl;
        return false;
    })
    //End Blueprint form for Salesforce


    //Start Blueprint form for Cisco
    $('#drip-modal-form-hidden-cisco').on('submit', function(ev) {
        var data = {
            "first_name": $('#drip-modal-form-hidden-cisco input[name="fields[first_name]"]').val(),
            "last_name": $('#drip-modal-form-hidden-cisco input[name="fields[last_name]"]').val(),
            "company": $('#drip-modal-form-hidden-cisco input[name="fields[company]"]').val(),
            "email": $('#drip-modal-form-hidden-cisco input[name="fields[email]"]').val(),
            "job_title": $('#drip-modal-form-hidden-cisco input[name="fields[job_title]"]').val(),
            "phone_number": $('#drip-modal-form-hidden-cisco input[name="fields[phone_number]"]').val(),
            "campaign_name": "Integration Blueprint for Cisco Spark"
        }
        sendDatatoFlow(data);
        var that = this;
        setTimeout(function() {
            that.reset();
        }, 4000);
        var linkPdf = $(that).find(".pdf-download").attr('data-pdf');
        var redirectUrl = $(that).find(".pdf-download").attr('data-href');
        window.open(linkPdf, '_blank');
        $('#about-project-dialog_cisco').modal('toggle');
        location.href = redirectUrl;
        return false;
    })
    //End Blueprint form for Cisco

    //PipeDrive
    function sendDatatoFlow(data) {
        $.ajax({
                url: 'https://elementIdToScrollnflow.built.io/elementIdToScrolln/W7SkaFJkW',
                type: 'POST',
                data: data,
            })
            .done(function(res) {

            })
    }
});

$("#btn").click(function() {
    $('html, body').animate({
        scrollTop: $("#code").offset().top
    }, 2000);
});

//service-common-page
$(document).ready(function(e) {
    $('[data-toggle="tooltip"]').tooltip();

    function toggleIcon(e) {
        $(e.target).prev('.panel-heading').find(".fa").toggleClass('fa-angle-up fa-angle-down');
    }
    $('.panel-group').on('hidden.bs.collapse', toggleIcon);
    $('.panel-group').on('shown.bs.collapse', toggleIcon);
    var elementIdToScroll = window.location.hash;
    $(elementIdToScroll).removeClass("in");
    if (window.location.hash != '') {
        $(elementIdToScroll).addClass("in");
        var $el = $(elementIdToScroll).parent();
        $('.fa-angle-down', $el).removeClass('fa-angle-down').addClass('fa-angle-up');
        $('body').animate({
            scrollTop: $(elementIdToScroll).offset().top - 200
        }, 1000);
    }
    $("#link").click(function(e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: $("#common").offset().top - 160
        }, 1000, 'linear');
    });
});



//FAQ page collapse menu
$(document).ready(function() {
	
    $('.question-wrapper h4').click(function(e) {
        var dropDown = $(this).closest('.question-wrapper').find('.answer');

        $(this).closest('.question-wrapper').find('.answer').not(dropDown).slideUp();

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('.question-wrapper h4').closest(".question-wrapper").find("h4.active").parent().find(".answer").slideUp();
            $(".question-wrapper").find("h4.active").removeClass('active');
            $(this).addClass('active');
        }
        dropDown.stop(false, true).slideToggle();
        e.preventDefault();
    });

    // scroll to section onclick of links in left sidebar
    $(".faq-categories a").click(function(e) {
        e.preventDefault();
        var section = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(section).offset().top - 160
        }, 600);
    });
});
