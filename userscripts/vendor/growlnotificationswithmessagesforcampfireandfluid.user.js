
// ==UserScript==
// @name          Growl notifications with messages for Campfire and Fluid.app
// @namespace     https://gist.github.com/882569
// @description   If your name is mentioned in a message, a growl notification shows what was said.
// @author        Tim Harper
// @homepage      http://userscripts.org/scripts/show/22891
// @include       *.campfirenow.com/room*
// ==/UserScript==

try {
  if (typeof(Campfire) != "undefined") {
    Campfire.window_is_focused = false;
    Campfire.currentName = $('user_' + window.chat.userID).down('span').innerHTML;
    // hook into the onMessagesInserted function
    if (typeof(Campfire.Transcript.prototype.insertMessages_without_hook) == "undefined") { Campfire.Transcript.prototype.insertMessages_without_hook = Campfire.Transcript.prototype.insertMessages; }
    Campfire.Transcript.prototype.insertMessages = function() {
      try {
        messages = this.insertMessages_without_hook.apply(this, arguments);
        messages.each(function(message) {
          if ((!Campfire.window_is_focused) && (message)) { notifyMessage(message); }
        });

        return messages;
      } catch(e) { notifyError(e); }
    }

    function notifyError(e) {
      if (typeof(i) == "undefined") { i = 0; }
      i = i + 1;
      new Insertion.Bottom('chat', "<tr class='system_message message'><td class='person'>ERROR " + i + "</td><td class='body' style='color:#ff0000'>An error has occurred in the Growl notification userscript on line " + (e.line-1) + ": " + e + "</td></tr>");
    }

    function notifyMessage(message) {
      try {
        message_dom_id = "message_" + message.id();
        if ($(message_dom_id)) {
          what_node = $$("#" + message_dom_id + " .body div").first();
          name_node = $$("#" + message_dom_id + " .person span").first();
          if (what_node && name_node) {
            what = what_node.innerHTML;
            name = name_node.innerHTML;
            growler.sendMessage(document.title, name, what)
          }
        }
      } catch(e) { notifyError(e) }
    }

    Event.observe(window, 'blur', function() { Campfire.window_is_focused = false; });
    Event.observe(window, 'focus', function() { Campfire.window_is_focused = true; });

    Object.extend(String.prototype, {
      stripHTML: function() { return(this.replace(/<[^>]+>/g, '').gsub("&gt;", ">").gsub("&lt;", "<").gsub("&amp;", "&")); }
    });

    Growler = Class.create();
    Growler.prototype = {
      initialize: function() {
        try {
          this.room = $('room_name').innerHTML;
          this.room_id = this.room.toLowerCase().gsub(/[^a-z0-9]/, "");
          this.showConfigForm();
          this.loadRoomSettings();
          this.populateSettings();
          this.saveRoomSettings(); // Keep the cookie alive
        } catch(e) { notifyError(e); }
      },
      matchesTrigger: function(message) {
        try {
          matcher = this.room_settings.get("trigger").strip();
          if (matcher.empty()) { return false }
          if (contents = /^\/(.+)\/([a-z]*)$/i.exec(matcher)) { matcher = new RegExp(contents[1], contents[2]); }
          else { matcher = new RegExp("\\b" + matcher + "\\b", "i"); }
          if (matcher.exec(message)) { return true; }
          return false;
        } catch(e) { notifyError(e); }
      },
      growlFor: function(message) {
        try {
          if (this.room_settings.get("growl_when") == "always") { return true; }
          if (this.matchesTrigger(message)) { return true; }
          return false;
        } catch(e) { notifyError(e); }
      },
      sendMessage: function(title, name, message) {
        try {
          if (! this.growlFor(message)) { return false; }
          alert_message = new String(name + ": " + message).stripHTML();
          fluid.showGrowlNotification({
            title: title,
            description: alert_message,
            priority: 2,
            sticky: this.matchesTrigger(message)
          });
        } catch(e) { notifyError(e); }
      },
      showConfigForm: function() {
        try {
          if ($('growl_config_div')) { $('growl_config_div').remove(); }
          new Insertion.After('search_form', "\
          <div id='growl_config_div'>\
          <h3>Growl</h3>\
          <div id='debug'></div>\
          <form id='growl_form' style='font-size: 10px'>\
            <div><input type='radio' name='growl_when' id='growl_when_always' value='always' /> Always, but stick on trigger</div>\
            <div><input type='radio' name='growl_when' id='growl_when_on_name' value='on_name' /> Only on trigger</div>\
            <div>Trigger: <input type='text' name='trigger' id='growl_trigger'/></div>\
          </form>\
          </div>\
          ");  
          that = this;
          $w("growl_when_always growl_when_on_name growl_trigger").each( function(e_id) {
            Event.observe(e_id, 'change', function(e) { this.extractSettings(); }.bindAsEventListener(that));
          });
        } catch(e) { notifyError(e); }
      },
      populateSettings: function() {
        try {
          if (this.room_settings.get("growl_when") == "always") { $('growl_when_always').checked = true; }
          else { $('growl_when_on_name').checked = true; }
          $('growl_trigger').value = this.room_settings.get("trigger");
        } catch(e) { notifyError(e); }
      },
      extractSettings: function() {
        try {
          this.room_settings = $H(Form.serialize('growl_form', true));
          this.saveRoomSettings();
        } catch(e) { notifyError(e); }
      },
      saveRoomSettings: function() {
        try {
          setCookie("growl_settings_" + this.room_id, this.room_settings.toJSON(), 14);
        } catch(e) { notifyError(e); }
      },
      loadRoomSettings: function() {
        try {
          if (serialized_settings = getCookie("growl_settings_" + this.room_id)) { eval("this.room_settings = $H(" + serialized_settings + ");"); }
          else {
            this.room_settings = $H({
              growl_when: 'always',
              trigger: Campfire.currentName
            });
          }
        } catch(e) { notifyError(e); }
      }
    }

    function setCookie(name, value, days) {
      try {
        expire_str = days ? ";expires="+(new Date(new Date().getTime() + days*24*60*60*1000)).toGMTString() : ""
        document.cookie = (name + "=" + escape(value)) + (expire_str);
      } catch(e) { notifyError(e); }
    }
    function getCookie(name) {
      try {
        return $A(document.cookie.split(";")).map(function(c) {
          parts = c.split("=")
          if (parts[0].toString().strip()==name) { return unescape(parts[1]); }
        }).compact().first();
      } catch(e) { notifyError(e); }
    }

    try {
      growler = new Growler();
    } catch(e) { notifyError(e); }

    function toggle(e) {
      try {
        if (e.style.display == 'block' || !e.style.display) { e.style.display = 'none'; }
        else e.style.display = 'block';
      } catch(e) { notifyError(e); }
    }

    // #Sidebar #growl_config_div h3 click:hides/shows #Sidebar #growl_config_div #growl_form
    try {
      document.getElementById('growl_config_div').getElementsByTagName('h3')[0].style.cursor = 'pointer';
      document.getElementById('growl_config_div').getElementsByTagName('h3')[0].addEventListener('click', function(event) {
          toggle(document.getElementById('growl_form'));
      });
    } catch(e) { notifyError(e); }
  }
} catch(e) { new Insertion.Before('room_locking', e); }
